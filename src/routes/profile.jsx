import { useEffect, useState } from "react";
import { getUserByID } from "../firebase/database"
import userSvg from "../assets/icon-user.svg"
import securitySvg from "../assets/icon-security.svg"
import privacySvg from "../assets/icon-privacy.svg"
import arrowSvg from "../assets/icon-arrow.svg"
import defaultPP from "../assets/defaultProfile.webp"
import ProfileOption from "../components/Settings.jsx";
import { NotificationProvider } from "../core/notificationContext.jsx";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [profileOption, setProfileOption] = useState("SettingCustomization");
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    const userID = sessionStorage.getItem('userID');

    useEffect(() => {
        if(!user) {
            getUserByID(userID).then(data => {
                setUser(data)
                setUserData(JSON.parse(localStorage.getItem('user')))
            })
        }
        document.addEventListener("update", ({ picture }) => { user.picture = picture })
        document.title = "BonPlanJV - Profile";
    }, [user, userID]);

    return (
        <NotificationProvider>
            <div className="min-h-screen w-full bg-neutral-800 flex justify-center">
                <div className="w-[80%] h-full flex flex-col justify-center">
                    <section className="mt-20 min-h-[30vh] w-full flex justify-center items-center space-x-5 text-white">
                        <img className="rounded-full w-[120px]" src={user?.picture ?? defaultPP} alt="pp" />
                        <div className="h-full flex flex-col justify-center">
                            <h1 className="text-4xl">{user?.username ?? 'username'}</h1>
                            <p className="text-sm text-gray-400">Member since: {new Date(Date(userData?.createdAt)).toDateString() ?? 'no records found'}</p>
                        </div>
                    </section>
                    <hr className="w-full flex my-10 border-neutral-700" />
                    <section className="h-[90vh] w-full flex text-white justify-between items-center">
                        <div className="h-full flex flex-col w-[45%] justify-start items-start space-y-5 mr-5">
                            <a
                                onClick={() => setProfileOption("SettingCustomization")}
                                className={`${profileOption == 1 ? 'text-bpjv' : 'text-white'} w-full flex justify-between items-center cursor-pointer`}>
                                <div className="flex space-x-5 items-center mr-5">
                                    <img className="h-[30px] svg-orange-500" src={userSvg} alt="svg" />
                                    <div className="bpjv-color">
                                        <h1 className="font-semibold">Customize your profile</h1>
                                        <p className="text-sm text-gray-400">Avatar and nickname</p>
                                    </div>
                                </div>
                                <img className="invert h-[15px] w-[8px]" src={arrowSvg} />
                            </a>
                            <a
                                onClick={() => setProfileOption("SettingSecurity")}
                                className={`${profileOption == 2 ? 'text-bpjv' : 'text-white'} w-full flex justify-between items-center cursor-pointer`}>
                                <div className="flex space-x-5 items-center mr-5">
                                    <img className="h-[30px] svg-orange-500" src={securitySvg} alt="svg" />
                                    <div className="bpjv-color">
                                        <h1 className="font-semibold">Email, password & 2FA</h1>
                                        <p className="text-sm text-gray-400">Manage email, password and two-factor authentication</p>
                                    </div>
                                </div>
                                <img className="invert h-[15px] w-[8px]" src={arrowSvg} />
                            </a>
                            <a
                                onClick={() => setProfileOption("SettingPrivacy")}
                                className={`${profileOption == 3 ? 'text-bpjv' : 'text-white'} w-full flex justify-between items-center cursor-pointer`}>
                                <div className="flex space-x-5 items-center mr-5">
                                    <img className="h-[30px] svg-orange-500" src={privacySvg} alt="svg" />
                                    <div className="bpjv-color">
                                        <h1 className="font-semibold">Privacy</h1>
                                        <p className="text-sm text-gray-400">Switch information public or private</p>
                                    </div>
                                </div>
                                <img className="invert h-[15px] w-[8px]" src={arrowSvg} />
                            </a>
                        </div>
                        <div className="h-full w-full border-l border-neutral-700">
                            <ProfileOption option={profileOption} />
                        </div>
                    </section>
                </div>
            </div>
        </NotificationProvider>

    )
}