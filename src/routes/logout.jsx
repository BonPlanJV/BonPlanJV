import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        document.dispatchEvent(new CustomEvent("auth", {  detail: { loggedIn: false } }))
        navigate('/login')
    }, [navigate])

    localStorage.removeItem('userID')
        navigate('/login')

    return
}