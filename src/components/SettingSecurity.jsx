import { useEffect, useState } from "react"
import { getUserByID, updateEmail, updatePassword } from "../firebase/database"
import { useNotification } from "../core/notificationContext";

export default function SettingSecurity() {
    const userID = sessionStorage.getItem("userID")
    const { showNotification } = useNotification();
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [email, setEmail] = useState(null);
    const [emailConfirm, setEmailConfirm] = useState(null);
    const [passwordEmail, setPasswordEmail] = useState(null);

    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [passwordCurrent, setPasswordCurrent] = useState(null);

    useEffect(() => {
       if(!user) getUserByID(userID).then(data => setUser(data))
    })

    return (
        <section className="w-full animate-[selection_0.5s_ease-in-out] ml-10">
            <div className="flex flex-col space-y-5">
                <div className="w-full">
                    <h1 className="font-semibold">Account security</h1>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
                {user?.providerId === "google.com" && (
                    <div id="google" className="w-full bg-neutral-700 p-5 rounded-md text-white">
                        Vous êtes connecté avec Google, vous ne pouvez pas changer vos identifiants.
                    </div>
                )}
                <div className="w-full flex space-x-5" {...(user?.providerId === "google.com" && { style: { display: "none" } })}>
                    <div className="w-full pr-5 border-r border-neutral-700 space-y-5">
                        <h1 className="font-semibold">Change your Email</h1>
                        <div className="flex flex-col space-y-5">
                            <input
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                placeholder="New email"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2"
                                type="email" />
                            <input
                                onChange={(e) => setEmailConfirm(e.currentTarget.value)}
                                placeholder="Confirm email"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="email" />
                            <input
                                onChange={(e) => setPasswordEmail(e.currentTarget.value)}
                                placeholder="Your current password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="password"/>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button onClick={() => updateEmail({ userID, currentEmail: user.email, email, emailConfirm, password: passwordEmail, showNotification})} className="h-[50px] font-semibold rounded bg-bpjv w-[30%]" type="button">Submit</button>
                        </div>
                    </div>
                    <div className="w-full space-y-5">
                        <h1 className="font-semibold">Change your Password</h1>
                        <div className="flex flex-col space-y-5">
                            <input 
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                placeholder="New password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2"
                                type="password" />
                            <input 
                                onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
                                placeholder="Confirm password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2"
                                type="password" />
                            <input
                                onChange={(e) => setPasswordCurrent(e.currentTarget.value)}
                                placeholder="Your current password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2"
                                type="password" />
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button onClick={() => updatePassword({ userID, currentPassword: passwordCurrent, newPassword: password, newPasswordConfirm: passwordConfirm, showNotification })} className="h-[50px] font-semibold rounded bg-bpjv w-[30%]" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="pt-10 space-y-5">
                    <h1 className="font-semibold">Two factor authentication {'(comming soon)'}</h1>
                    <div className="blur cursor-not-allowed	w-full h-[20vh] rounded-xl bg-neutral-700 flex flex-col justify-center items-center space-y-5">
                        <p className="text-md text-white">Get codes with your favorite authentication mobile application to secure your account</p>
                        <button disabled={true} onClick={null} className="h-[50px] font-semibold rounded bg-bpjv w-[20%] cursor-not-allowed" type="submit">Enable</button>
                    </div>
                </div>
            </div>
        </section>
    )
}