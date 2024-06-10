import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { handleLogOut } from "../firebase/database"

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        document.dispatchEvent(new CustomEvent("auth", {  detail: { loggedIn: false } }))
        handleLogOut(navigate)
    }, [navigate])

    localStorage.removeItem('userID')

    return
}