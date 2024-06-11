import { useEffect, useState } from "react";
import defaultPP from "../assets/defaultProfile.webp"
import photoSvg from "../assets/icon-photo.svg"

export default function ProfileOption({ option }) {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState(false);
    const [security, setSecurity] = useState(false);

    useEffect(() => {
        switch (option) {
            case 1:
                setUser(false)
                setSecurity(false)
                setProfile(true)
                break;
            case 2:
                setSecurity(false)
                setProfile(false)
                setUser(true)
                break;
            case 3:
                setProfile(false)
                setUser(false)
                setSecurity(true)
                break;
            default:
                setUser(false)
                setSecurity(false)
                setProfile(true)
                break;
        }
    }, [option])


    return (
        <>
            {
                profile == true ?
                    <section className="ml-10">
                        <div className="flex space-x-10">
                            <div className="flex flex-col space-y-5 w-[40%]">
                                <h1 className="font-semibold">Profile Picture</h1>
                                <a className="flex space-x-5 items-center cursor-pointer">
                                    <img className="h-[50px] rounded-full" src={defaultPP} alt="" />
                                    <div className="flex items-center space-x-2">
                                        <img className="h-[30px] invert" src={photoSvg} alt="" />
                                        <p className="text-md text-gray-400">.jpg .png</p>
                                    </div>
                                </a>
                            </div>
                            <div className="w-full space-y-5">
                                <h1 className="font-semibold">Username</h1>
                                <div className="flex space-x-5">
                                    <input className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600" type="text" name="" id="" />
                                    <button className="h-[50px] font-semibold rounded bg-bpjv w-[20%]" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </section> : ''
            }

            {
                user == true ?
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