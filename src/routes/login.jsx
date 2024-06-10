/* eslint-disable react/no-unescaped-entities */
import { submitLogin } from "../firebase/database";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import bglogin from "../assets/bglogin.jpg"
import banner from '../assets/Banner.png'
import close from '../assets/close.png'

export default function Login() {
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(sessionStorage.getItem("userID"))
    if(userId) navigate('/profile')
    document.title = "Login";
  }, [userId, navigate]);

  const state = {
    email: null,
    password: null,
  };

  return (
    <main className="h-screen absolute z-10 w-full text-center mx-auto text-gray-700 flex flex-col justify-center items-center bg-neutral-800">
      <header className="absolute z-10 top-0 w-full p-5">
        <nav className="flex w-full place-content-between">
          <Link to={'/'}><img src={banner} className="h-14" /></Link>
          <Link to={'/'}><img src={close} className="h-8 invert"/></Link>
        </nav>
      </header>
      <section className="w-full h-full flex justify-center items-center bg-neutral-800">
      <div className="flex w-[50%] text-white p-5 rounded-xl justify-center items-center space-y-5">
        <div className="flex flex-col items-start w-[60%]">
        <h1 className="text-xl font-semibold">Log in</h1>
        <hr className="w-full flex my-10"/> 
        <form className="container flex flex-col w-full justify-center items-center space-y-10 text-neutral-800">
          <div className="flex flex-col w-full space-y-2">
            <input
              onInput={(e) => {
                state.email = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-3"
              type="text"
              placeholder="Nom d'utilisateur"
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <input
              onInput={(e) => {
                state.password = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-3"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const { email, password } = state;
              submitLogin({ email, password }, navigate, setMessage);
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
          <p className="text-red-500 text-start w-full" >{message}</p>
        </form>
        </div>
      </div>
      <div className="w-[50%] h-full flex brightness-50 bg-white">
        <img className="w-full bg-cover" src={bglogin} alt="" />
      </div>
      </section>
    </main>
  );
}
