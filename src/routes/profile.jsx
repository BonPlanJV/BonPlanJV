import { useEffect, useState } from "react";
import { getUserByID } from "../firebase/database"
import userSvg from "../assets/icon-user.svg"
import securitySvg from "../assets/icon-security.svg"
import privacySvg from "../assets/icon-privacy.svg"
import arrowSvg from "../assets/icon-arrow.svg"
import defaultPP from "../assets/defaultProfile.webp"
import ProfileOption from "../components/ProfileOption";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [profileOption, setProfileOption] = useState(1);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    const userID = sessionStorage.getItem('userID');

    useEffect(() => {
        getUserByID(userID).then(data => {
            setUser(data)
            setUserData(JSON.parse(localStorage.getItem('user')))
        })
        document.title = "Profile";
    }, [userID]);

    return (
        <div className="h-screen w-full bg-neutral-800 flex justify-center">
            <div className="w-[80%] h-full flex flex-col justify-center">
                <section className="h-[30vh] w-full flex justify-center items-center space-x-5 text-white">
                    <img className="rounded-full w-[120px]" src={user?.picture ?? defaultPP} alt="pp" />
                    <div className="h-full flex flex-col justify-center">
                        <h1 className="text-4xl">{user?.username ?? 'username'}</h1>
                        <p className="text-sm text-gray-400">Member since: {new Date(Date(userData.createdAt)).toDateString() ?? 'no records found'}</p>
                    </div>
                </section>
                <hr className="w-full flex my-10 border-neutral-700" />
                <section className="w-full flex text-white justify-between items-center">
                    <div className="flex flex-col w-[40%] justify-center items-center space-y-5 mr-5">
                        <a
                            onClick={() => setProfileOption(1)}
                            className="w-full flex justify-between items-center cursor-pointer">
                            <div className="flex space-x-5 items-center">
                                <img className="h-[30px] svg-orange-500" src={userSvg} alt="svg" />
                                <div className="bpjv-color">
                                    <h1 className="font-semibold">Customize your profile</h1>
                                    <p className="text-sm text-gray-400">description</p>
                                </div>
                            </div>
                            <img className="invert h-[15px] w-[8px]" src={arrowSvg} />
                        </a>
                        <a
                            onClick={() => setProfileOption(2)}
                            className="w-full flex justify-between items-center cursor-pointer">
                            <div className="flex space-x-5 items-center">
                                <img className="h-[30px] svg-orange-500" src={securitySvg} alt="svg" />
                                <div className="bpjv-color">
                                    <h1 className="font-semibold">Email, password & 2FA</h1>
                                    <p className="text-sm text-gray-400">description</p>
                                </div>
                            </div>
                            <img className="invert h-[15px] w-[8px]" src={arrowSvg} />
                        </a>
                        <a
                            onClick={() => setProfileOption(3)}
                            className="w-full flex justify-between items-center cursor-pointer">
                            <div className="flex space-x-5 items-center">
                                <img className="h-[30px] svg-orange-500" src={privacySvg} alt="svg" />
                                <div className="bpjv-color">
                                    <h1 className="font-semibold">Privacy</h1>
                                    <p className="text-sm text-gray-400">description</p>
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
    )
}