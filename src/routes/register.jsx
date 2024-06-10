/* eslint-disable react/no-unescaped-entities */
import { submitRegister } from "../firebase/database";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import bglogin from "../assets/bglogin.jpg"
import banner from '../assets/Banner.png'
import close from '../assets/close.png'

export default function Login() {
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(undefined);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    username: null,
    email: null,
    password: null,
    confirmpassword: null,
    terms: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    setUserId(sessionStorage.getItem("userID"))
    if (userId) navigate('/profile')
    document.title = "Login";
  }, [userId, navigate]);

  const register = ({ username, email, password, confirmpassword, terms }) => {
    setMessage('')
    if(!username) return setMessage('You should provide a username.')
    if(password != confirmpassword) return setMessage('Passwords dont match.')
    if(!terms) return setMessage('You should accept the Terms & Policy.')
    submitRegister({ username, email, password }, navigate, setMessage)
    setForm(form)
  }
  
  return (
    <main className="h-screen absolute z-10 w-full text-center mx-auto text-gray-700 flex flex-col justify-center items-center bg-neutral-800">
      <header className="absolute z-20 top-0 w-full p-5">
        <nav className="flex w-full place-content-between">
          <Link to={'/'}><img src={banner} className="h-14" /></Link>
          <Link to={'/'}><img src={close} className="h-8 invert" /></Link>
        </nav>
      </header>
      <section className="w-full h-full flex justify-start items-center bg-neutral-800">
        <div className="absolute z-10 flex w-full xl:w-[50%] h-full text-white p-5 justify-center items-center space-y-5 bg-neutral-800">
          <div className="flex flex-col items-start w-[80%] md:w-[70%]">
            <h1 className="text-xl font-semibold">Register</h1>
            <hr className="w-full flex my-10" />
            <form className="container flex flex-col w-full justify-center items-center space-y-10 text-neutral-800">
            <div className="flex flex-col w-full space-y-2">
                <input
                  onInput={(e) => {
                    form.username = e.currentTarget.value;
                  }}
                  className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3"
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <input
                  onInput={(e) => {
                    form.email = e.currentTarget.value;
                  }}
                  className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3"
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <input
                  onInput={(e) => {
                    form.password = e.currentTarget.value;
                  }}
                  className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0 rounded-md px-2 py-3"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <input
                  onInput={(e) => {
                    form.confirmpassword = e.currentTarget.value;
                  }}
                  className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0 rounded-md px-2 py-3"
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="current-password"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  register(form);
                }}
                disabled={!checked}
                className={`disabled:bg-orange-400 bg-orange-500 rounded-md px-2 py-3 text-white font-semibold w-full hover:bg-orange-600`}
              >
                Register
              </button>
              <div className="flex w-full place-content-between text-white">
                <div className="space-x-2">
                  <input 
                  onChange={(e) => {
                    form.terms = e.currentTarget.checked
                    setChecked(e.currentTarget.checked);
                  }}
                  type="checkbox"
                  className="checked:bg-blue-500" 
                  />
                  <label>Accept the Terms & Policy</label>
                </div>
                <a href={"/login"}>
                  Already an account ?
                </a>
              </div>
              <p className="text-red-500 text-start w-full" >{message}</p>
            </form>
          </div>
        </div>
        <div className="hidden xl:flex w-full h-full justify-end brightness-50 bg-white">
          <img className="md:w-auto xl:w-[50%] bg-cover" src={bglogin} alt="" />
        </div>
      </section>
    </main>
  );
}
