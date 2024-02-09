import image from "~/assets/background.jpeg"
import { onMount, createSignal } from "solid-js";
import { getGames } from "../firebase/database.jsx";

export default function Home() {

  const [gamesArray, setGamesArray] = createSignal([]);
  onMount(() => {
    getGames().then((games) => {
      setGamesArray(games);
    });
  });

  // return (
  //   <main>
  //     {/* Render your games here */}
  //     {gamesArray().map((game) => (
  //       <div key={game.id}>
  //         <h1>{game.title}</h1>
  //         <p>{game.description}</p>
  //         {/* Render other game details */}
  //       </div>
  //     ))}
  //   </main>
  // );

  // return (
  //   <main class="h-screen w-full text-center mx-auto text-gray-700">
  //     <div class="absolute z-1 h-full w-full bg-bg bg-center bg-cover"></div>
  //     <div class="h-[60vh]"></div>
  //     <div class="absolute h-screen w-full">
  //       <div class="h-[15vh] clip w-full bg-neutral-800"></div>
  //       <div class="h-full w-full bg-neutral-800 p-5 flex justify-center">
  //         <div class="w-[90%] h-full space-y-10">
  //           <h1 class="text-4xl text-white text-start absolute top-20">Jeux du moment</h1>
  //           <div class="flex flex-wrap space-y-5">
  //             {gamesArray().map((game) => (
  //               <div class="bg-neutral-900 w-full rounded-xl p-5 flex">
  //                 <img src={image} class="h-[150px] object-cover rounded-xl" />
  //                 <div class="px-5">
  //                   <div class="flex flex-col space-y-2">
  //                     <div class="flex space-x-5">
  //                       <input type="number" value={1} class="bg-neutral-700 text-white text-center rounded-full w-[50px]" />
  //                       <button class="bg-neutral-700 w-[25px] text-white rounded-full">*</button>
  //                       <button class="bg-neutral-700 text-white rounded-full px-4 py-1">Commentaires 29</button>
  //                     </div>
  //                     <div class="flex space-x-5 items-center">
  //                       <h1 class="text-white text-xl">{game.titre}</h1>
  //                       <div>
  //                         <p class="min-w-[100px] text-orange-500 px-2 py-1 bg-neutral-700 rounded-xl">Tag</p>
  //                       </div>
  //                       <p class="text-orange-500">18,34€</p>
  //                     </div>
  //                     <p class="text-wrap text-start">The Legend of Zelda: Breath of the Wild est un jeu d'action-aventure développé par la division Nintendo EPD, assisté par Monolith Soft, et publié par Nintendo...</p>
  //                   </div>
  //                 </div>
  //                 <div class="w-[15%] h-full space-y-8">
  //                   <div class="flex items-center space-x-2">
  //                     <p>TotoLeBg</p>
  //                     <img src={image} class="h-[40px] w-[40px] rounded-full" />
  //                   </div>
  //                   <button class="bg-orange-500 rounded-xl w-fit py-1 px-2">Voir le jeu</button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <h1 >Bienvenue sur Bon plans JV</h1>
  //   </main>
  // );
}
