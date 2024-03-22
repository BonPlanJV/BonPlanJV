import { onMount, createSignal } from "solid-js";
import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import Nav from "~/components/Nav.jsx";

export default function Home() {

  const [gamesArray, setGamesArray] = createSignal([]);
  onMount(() => {
    readData("games").then((games) => {
      Promise.all(
        Object.values(games).map(async (game) => {
          const user = await getUserByID(game.auteur);
          const tags = await Promise.all(game.tags.map(async (tagID) => {
            const tag = await getTagByID(tagID);
            return tag;
          }));
          return { ...game, auteur: user, tags: tags};
        })
      ).then((gamesWithUser) => {
        setGamesArray(gamesWithUser);
      });
    });
  }, []);

  return (
    <>
    <Nav />
    <main class="h-screen w-full text-center mx-auto text-gray-700">
      <div class="absolute z-1 h-full w-full bg-bg bg-center bg-cover"></div>
      <div class="h-[60vh]"></div>
      <div class="absolute h-screen w-full">
        <div class="h-[15vh] clip w-full bg-neutral-800"></div>
        <div class="h-full w-full bg-neutral-800 p-5 flex justify-center">
          <div class="w-[90%] h-full space-y-10">
            <h1 class="text-4xl text-white text-start absolute top-20">Jeux du moment</h1>
            <div class="flex flex-wrap space-y-5">
              {gamesArray().map((game) => (
                <div class="bg-neutral-900 w-full rounded-xl p-5 flex">
                  <img src={game.image} class="h-[150px] object-cover rounded-xl" />
                  <div class="px-5">
                    <div class="flex flex-col space-y-2">
                      <div class="flex space-x-5">
                        <input type="number" value={1} class="bg-neutral-700 text-white text-center rounded-full w-[50px]" />
                        <button class="bg-neutral-700 w-[25px] text-white rounded-full">*</button>
                        <button class="bg-neutral-700 text-white rounded-full px-4 py-1">Commentaires 29</button>
                      </div>
                      <div class="flex space-x-2 items-center">
                        <h1 class="text-white text-xl">{game.titre}</h1>
                        {game.tags.map((tag) => (
                          <div>
                            <p class="min-w-[100px] text-orange-500 px-3 py-1 bg-neutral-700 rounded-full">{tag.name}</p>
                          </div>
                        ))}
                        <p class="text-orange-500">{game.prix} €</p>
                      </div>
                      <p class="text-wrap text-start">{game.description}</p>
                    </div>
                  </div>
                  <div class="w-[15%] h-full space-y-8">
                    <div class="flex items-center space-x-2">
                      <p>{game.auteur.pseudo}</p><img src={game.auteur.image} class="h-[40px] w-[40px] rounded-full" />
                    </div>
                    <button class="bg-orange-500 rounded-xl w-fit py-1 px-2">Voir le jeu</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1>Bienvenue sur Bon plans JV</h1>
    </main>
    </>
  );
}
