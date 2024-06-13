import { useEffect, useState } from "react";
import SettingCustomization from "./SettingCustomization.jsx";
import SettingSecurity from "./SettingSecurity.jsx";
import SettingPrivacy from "./SettingPrivacy.jsx";
import SwitchComponents from "./SwitchComponent.jsx";

export default function ProfileOption({ option }) {
    const [activeComponent, setActiveComponent] = useState("SettingCustomization")


    useEffect(() => {
        setActiveComponent(option)
    }, [option])


    return (
        <SwitchComponents active={activeComponent}>
            <SettingCustomization name="SettingCustomization" />
            <SettingPrivacy name="SettingPrivacy" />
            <SettingSecurity name="SettingSecurity" />
        </SwitchComponents>
    )
}