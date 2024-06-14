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
                document.getElementById("preview").src = resizedBase64;
                setResizedB64(resizedBase64)
            };
        };
        reader.readAsDataURL(file);
    };

    const dispatch = (type, data) => {
        document.dispatchEvent(new CustomEvent(type, { detail: data }))
    }

    const updatePicture = (picture, silent = true) => {
        getUserByID(userID).then(({ username, email }) => {
            setData(`users/${userID}`, {
                username,
                email,
                picture
            }).then(() => {
                setResizedB64(null)
                if (!silent) {
                    showNotification('picture updated succesfully', 'success')
                    dispatch("update", { picture })
                }
            })
        })
    }

    const updateUsername = (username, silent = true) => {
        updateData(`users/${userID}`, { username }).then(() => {
            getUserByID(userID).then(data => setUser(data))
            setNewUsername(null)
            if (!silent) {
                showNotification('username updated succesfully', 'success')
                dispatch("update", { username })
            }
        })
    }

    const updateUsernameAndPicture = (picture, username) => {
        updatePicture(picture)
        updateUsername(username)
        showNotification('username & picture updated succesfully', 'success')
        dispatch("update", { username, picture })
    }
    
    const submit = () => {
        if (resizedB64 !== null && (newUsername !== null && newUsername !== user.username)) return updateUsernameAndPicture(resizedB64, newUsername)
        if (resizedB64 !== null) return updatePicture(resizedB64, false)
        if (newUsername !== null && newUsername !== user.username) return updateUsername(newUsername, false)
        showNotification('Nothing to change.', 'error')
    }

    return (
        <section className="w-full animate-[selection_0.5s_ease-in-out] ml-10">
            <div className="flex space-x-10">
                
                <div className="flex flex-col space-y-5 w-[40%]">
                    <h1 className="font-semibold">Profile Picture</h1>
                    {user?.providerId === "google.com" && (
                        <div id="google" className="w-full bg-neutral-700 p-5 rounded-md text-white">
                            You are connected with Google, <br/>you can&apos;t change your picture.
                        </div>
                    )}
                    <a
                        onClick={imgUpload}
                        className="flex space-x-5 items-center cursor-pointer"
                        {...(user?.providerId === "google.com" && { style: { display: "none" } })}>
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