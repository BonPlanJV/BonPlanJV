import { useEffect, useState } from "react";
import defaultPP from "../assets/defaultProfile.webp"
import photoSvg from "../assets/icon-photo.svg"
import { getUserByID, setData, updateData } from "../firebase/database";
import { useNotification } from "../core/notificationContext.jsx";

export default function ProfileOption({ option }) {
    const { showNotification } = useNotification();
    const userID = sessionStorage.getItem("userID")
    const [user, setUser] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [resizedB64, setResizedB64] = useState(null);
    const [profile, setProfile] = useState(false);
    const [security, setSecurity] = useState(false);
    const [privacy, setPrivacy] = useState(false);

    useEffect(() => {
        getUserByID(userID).then(data => setUser(data))
        switch (option) {
            case 1:
                setPrivacy(false)
                setSecurity(false)
                setProfile(true)
                break;
            case 2:
                setSecurity(false)
                setProfile(false)
                setPrivacy(true)
                break;
            case 3:
                setProfile(false)
                setPrivacy(false)
                setSecurity(true)
                break;
            default:
                setPrivacy(false)
                setSecurity(false)
                setProfile(true)
                break;
        }
    }, [option, userID])

    const imgUpload = () => {
        const input = document.getElementById("picture")
        input.click()
    }

    var loadFile = (event) => {
        const file = event.target.files[0];
        if(!file) return
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

const updatePicture = (picture) => {
    getUserByID(userID).then(({ username, email }) => {
        setData(`users/${userID}`, {
            username,
            email,
            picture
        }).then(() =>  {
            setResizedB64(null)
            showNotification('picture updated succesfully', 'success')
            document.dispatchEvent(new CustomEvent("update", { picture }))
        })
    })
}

const updateUsername = (username) => {
    updateData(`users/${userID}`, { username }).then(() =>  {
        showNotification('username updated succesfully', 'success')
        getUserByID(userID).then(data => setUser(data))
        setNewUsername(null)
    })
}

const submit = () => {
    if(resizedB64 || newUsername !== user.username) {
        resizedB64 ? updatePicture(resizedB64) : ''
        newUsername ? updateUsername(newUsername) : ''
    } else showNotification('Nothing to change.', 'error')
}

return (
    <>
        {
            profile == true ?
                <section className="ml-10">
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
                                <input hidden type="file" id="picture" onChange={loadFile} accept="image/png, image/jpg"/>
                            </a>
                        </div>
                        <div className="w-full space-y-5">
                            <h1 className="font-semibold">Username</h1>
                            <div className="flex space-x-5">
                                <input onChange={(e) => setNewUsername(e.currentTarget.value)} className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" defaultValue={user?.username ?? ''} type="text" id="" />
                                <button onClick={submit} className="h-[50px] font-semibold rounded bg-bpjv w-[20%]" type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </section> : ''
        }

        {
            privacy == true ?
                <section className="space-y-10">
                    <div className="flex space-x-5">
                        <h1>User</h1>
                        <input type="file" name="" id="" />
                    </div>
                    <div>
                        <h1>Username</h1>
                        <input type="text" name="" id="" />
                    </div>
                </section> : ''
        }

        {
            security == true ?
                <section className="space-y-10">
                    <div className="flex space-x-5">
                        <h1>Security</h1>
                        <input type="file" name="" id="" />
                    </div>
                    <div>
                        <h1>Username</h1>
                        <input type="text" name="" id="" />
                    </div>
                </section> : ''
        }
    </>
)
}