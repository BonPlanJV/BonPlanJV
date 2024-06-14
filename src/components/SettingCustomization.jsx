import { useEffect, useState } from "react";
import defaultPP from "../assets/defaultProfile.webp"
import photoSvg from "../assets/icon-photo.svg"
import { useNotification } from "../core/notificationContext";
import { getUserByID, setData, updateData } from "../firebase/database.jsx";

export default function SettingCustomization() {
    const { showNotification } = useNotification();
    const userID = sessionStorage.getItem("userID")
    const [resizedB64, setResizedB64] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [user, setUser] = useState(sessionStorage.getItem("user"));

    useEffect(() => {
        if(!user) getUserByID(userID).then(data => setUser(data))
    })

    const imgUpload = () => {
        const input = document.getElementById("picture")
        input.click()
    }

    const loadFile = (event) => {
        const file = event.target.files[0];
        if (!file) return
        if (!file.type.startsWith('image/')) {
            showNotification('Only images allowed', 'error')
            return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 250;
                canvas.height = 250;
                ctx.drawImage(img, 0, 0, 250, 250);
                const resizedBase64 = canvas.toDataURL("image/png");
                var base64str = resizedBase64.split('base64,')[1];
                var decoded = atob(base64str);

                console.log("FileSize: " + decoded.length);
                document.getElementById("preview").src = resizedBase64;
                setResizedB64(resizedBase64)
            };
        };
        reader.readAsDataURL(file);
    };

    const updatePicture = (picture) => {
        getUserByID(userID).then(({ username, email }) => {
            setData(`users/${userID}`, {
                username,
                email,
                picture
            }).then(() => {
                setResizedB64(null)
                showNotification('picture updated succesfully', 'success')
                document.dispatchEvent(new CustomEvent("update", { picture }))
            })
        })
    }

    const updateUsername = (username) => {
        updateData(`users/${userID}`, { username }).then(() => {
            showNotification('username updated succesfully', 'success')
            getUserByID(userID).then(data => setUser(data))
            setNewUsername(null)
        })
    }
    
    const submit = () => {
        if (resizedB64 !== null) updatePicture(resizedB64)
        if (newUsername !== null && newUsername !== user.username) updateUsername(newUsername)
        else showNotification('Nothing to change.', 'error')
    }

    return (
        <section className="w-full animate-[selection_0.5s_ease-in-out] ml-10">
            <div className="flex space-x-10">
                <div className="flex flex-col space-y-5 w-[40%]">
                    <h1 className="font-semibold">Profile Picture</h1>
                    <a
                        onClick={imgUpload}
                        className="flex space-x-5 items-center cursor-pointer">
                        <img id="preview" className="h-[50px] rounded-full" src={user?.picture ?? defaultPP} alt="" />
                        <div className="flex items-center space-x-2">
                            <img className="h-[30px] w-[30px] invert" src={photoSvg} alt="" />
                            <p className="text-md text-gray-400">.jpg .png</p>
                        </div>
                        <input hidden type="file" id="picture" onChange={loadFile} accept="image/png, image/jpg" />
                    </a>
                </div>
                <div className="w-full space-y-5">
                    <h1 className="font-semibold">Username</h1>
                    <div className="flex space-x-5">
                        <input onChange={(e) => setNewUsername(e.currentTarget.value)} className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" defaultValue={user?.username} type="text"/>
                        <button onClick={submit} className="h-[50px] font-semibold rounded bg-bpjv w-[20%]" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    )
}