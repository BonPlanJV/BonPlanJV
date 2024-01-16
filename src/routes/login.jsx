import { A } from "@solidjs/router";
import { onMount } from "solid-js";

export default function Login() {
    onMount(() => {
        document.title = "Login"
      })
    return (
        <main class="min-h-[90vh] w-full text-center mx-auto text-gray-700 p-4 flex justify-center items-center">
            <div class="flex flex-col w-[30%] justify-center items-center space-y-5">
                <h1>Connexion / Login</h1>
                <div class="container flex flex-col w-[80%] justify-center items-center space-y-5">
                    <div class="flex flex-col w-full space-y-2">
                        <input class="border bg-gray-200 rounded-md px-2 py-2" type="text" placeholder="Nom d'utilisateur" />
                    </div>
                    <div class="flex flex-col w-full space-y-2">
                        <input class="border bg-gray-200 rounded-md px-2 py-2" type="password" placeholder="Password" />
                    </div>
                    <button class="border bg-gray-200 rounded-md px-2 py-1 w-[150px]">Login</button>
                    <p>Vous n'avez pas de compte ? Créez en un 
                    <A href={'/register'} class="text-blue-500" >ici</A></p>
                </div>
            </div>
        </main>
    );
}
