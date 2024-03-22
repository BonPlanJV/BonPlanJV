import { A, useNavigate} from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import Nav from "~/components/Nav";
import { submitRegister } from "~/firebase/database";

export default function Register() {
    const navigate = useNavigate()
    const [message, setMessage] = createSignal(null);
    onMount(() => {
        document.title = "Register"
    })

    const userData = {
        pseudo: null,
        email: null,
      }

    const userSecrets = {
        email: null,
        password: null
    }

    return (
        <>
            <Nav />
            <main class="h-screen min-h-[90vh] w-full text-center mx-auto text-gray-700 p-4 flex justify-center items-center bg-neutral-800">
            <div class="flex flex-col w-[30%] justify-center items-center space-y-5">
                <h1>Connexion / Login</h1>
                <div class="container flex flex-col w-[80%] justify-center items-center space-y-5">
                    <div class="flex flex-col w-full space-y-2">
                        <input 
                        oninput= {(e) => {userData.pseudo = e.currentTarget.value}}
                        class="border bg-gray-200 rounded-md px-2 py-2" type="text" placeholder="Nom d'utilisateur" />
                    </div>
                    <div class="flex flex-col w-full space-y-2">
                        <input 
                        oninput= {(e) => {userSecrets.email = e.currentTarget.value}}
                        class="border bg-gray-200 rounded-md px-2 py-2" type="text" placeholder="Email" />
                    </div>
                    <div class="flex flex-col w-full space-y-2">
                        <input 
                        oninput= {(e) => {userSecrets.password = e.currentTarget.value}}
                        class="border bg-gray-200 rounded-md px-2 py-2" type="password" placeholder="Password" />
                    </div>
                    <button 
                    onClick={async () => {
                        submitRegister({ userData, userSecrets }, navigate, setMessage)
                    }}
                    class="bg-gray-200 rounded-md px-2 py-1 w-[150px] hover:bg-gray-300">Inscription</button>
                    <p>Vous avez un compte ? Connectez vous 
                    <A href={'/login'} class="text-blue-500" >ici</A></p>
                    <p>{ message }</p>
                </div>
            </div>
        </main>
        </>
    );
}
