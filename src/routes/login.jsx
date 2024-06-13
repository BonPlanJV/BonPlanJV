/* eslint-disable react/no-unescaped-entities */
import { submitLogin } from "../firebase/database";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import bglogin from "../assets/bglogin.jpg"
import banner from '../assets/Banner.png'
import close from '../assets/close.png'
import { useNotification } from "../core/notificationContext.jsx";

export default function Login() {
  const { showNotification } = useNotification();
  const [userId, setUserId] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(sessionStorage.getItem("userID"))
    if (userId) navigate('/profile')
    document.title = "Login";
  }, [userId, navigate]);

  return (
      <div className="h-screen absolute z-10 w-full text-center mx-auto text-gray-700 flex flex-col justify-center items-center bg-neutral-800">
        <header className="absolute z-20 top-0 w-full p-5">
          <nav className="flex w-full place-content-between">
            <Link to={'/'}><img src={banner} className="h-14" /></Link>
            <Link to={'/'}><img src={close} className="h-8 invert" /></Link>
          </nav>
        </header>
        <section className="w-full h-full flex justify-start items-center bg-neutral-800">
          <div className="absolute z-10 flex w-full xl:w-[50%] h-full text-white p-5 justify-center items-center space-y-5 bg-neutral-800">
            <div className="flex flex-col items-start w-[80%] md:w-[70%]">
              <h1 className="text-xl font-semibold">Log in</h1>
              <hr className="w-full flex my-10" />
              <div className="container flex flex-col w-full justify-center items-center space-y-10 text-neutral-800">
                <div className="flex flex-col w-full space-y-2">
                  <input
                    onInput={(e) => {
                      e.preventDefault()
                      setEmail(e.currentTarget.value)
                    }}
                    className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    autoComplete="username"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <input
                    onInput={(e) => {
                      e.preventDefault()
                      setPassword(e.currentTarget.value)
                    }}
                    className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0 rounded-md px-2 py-3"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    id="mdp"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    submitLogin({ email, password }, navigate, showNotification);
                  }}
                  className="bg-orange-500 rounded-md px-2 py-3 text-white font-semibold w-full hover:bg-orange-600"
                >
                  Login
                </button>
                <div className="flex w-full place-content-between text-white">
                  <a href={"/register"}>
                    No account yet ?
                  </a>
                  <a href={"/register"}>
                    Lost password ?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex w-full h-full justify-end brightness-50 bg-white">
            <img className="md:w-auto xl:w-[50%] bg-cover" src={bglogin} alt="" />
          </div>
        </section>
      </div>
  );
}
