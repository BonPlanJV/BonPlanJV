import { useEffect, useState } from "react";
import { submitRegister } from "../firebase/database";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    document.title = "Register";
  });

  const userData = {
    pseudo: null,
    email: null,
  };

  const userSecrets = {
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
                userData.pseudo = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-2"
              type="text"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <input
              onInput={(e) => {
                userSecrets.email = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-2"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <input
              onInput={(e) => {
                userSecrets.password = e.currentTarget.value;
              }}
              className="border bg-gray-200 rounded-md px-2 py-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            onClick={async () => {
              submitRegister({ userData, userSecrets }, navigate, setMessage);
            }}
            className="bg-gray-200 rounded-md px-2 py-1 w-[150px] hover:bg-gray-300"
          >
            Inscription
          </button>
          <p>
            Vous avez un compte ? Connectez vous
            <a href={"/login"} className="text-blue-500">
              ici
            </a>
          </p>
          <p>{message}</p>
        </form>
      </div>
    </main>
  );
}
