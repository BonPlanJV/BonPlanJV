import { submitLogin } from "../firebase/database";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    document.title = "Login";
  });

  const state = {
    email: null,
    password: null,
  };

  return (
    <main className="h-screen min-h-[90vh] w-full text-center mx-auto text-gray-700 p-4 flex justify-center items-center bg-neutral-800">
      <div className="flex flex-col w-[30%] justify-center items-center space-y-5">
        <h1>Connexion / Login</h1>
        <form className="container flex flex-col w-[80%] justify-center items-center space-y-5">
          <div className="flex flex-col w-full space-y-2">
            <input
              onInput={(e) => {
                state.email = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-2"
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
              className="border bg-gray-200 rounded-md px-2 py-2"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button
            onClick={async () => {
              const { email, password } = state;
              submitLogin({ email, password }, navigate, setMessage);
            }}
            className="bg-gray-200 rounded-md px-2 py-1 w-[150px] hover:bg-gray-300"
          >
            Login
          </button>
          <p>
            Vous n&aposavez pas de compte ? Créez en un
            <a href={"/register"} className="text-blue-500">
              ici
            </a>
          </p>
          <p>{message}</p>
        </form>
      </div>
    </main>
  );
}
