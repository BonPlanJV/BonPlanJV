import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import ScoreButton from "../components/ScoreButton";
import { useState, useEffect } from "react";

export default function Home() {

  const [gamesArray, setGamesArray] = useState([]);
  useEffect(() => {
    readData("games").then((games) => {
      Promise.all(
        Object.entries(games).map(async (gameEntries) => {
          const key = gameEntries[0];
          const game = gameEntries[1];
          const user = await getUserByID(game.auteur);
          const tags = await Promise.all(game.tags.map(async (tagID) => {
            const tag = await getTagByID(tagID);
            return tag;
          }));
          return { ...game, auteur: user, tags: tags, key: key};
        })
      ).then((gamesWithUser) => {
        setGamesArray(gamesWithUser);
      });
    });
  }, []);

  return (
    <main className="h-screen w-full text-center mx-auto text-gray-700">
      <div className="absolute z-1 h-full w-full bg-bg bg-center bg-cover"></div>
      <div className="h-[60vh]"></div>
      <div className="absolute h-screen w-full">
        <div className="h-[15vh] clip w-full bg-neutral-800"></div>
        <div className="h-full w-full bg-neutral-800 p-5 flex justify-center">
          <div className="w-[90%] h-full space-y-10">
            <h1 className="text-4xl text-white text-start absolute top-20">Jeux du moment</h1>
            <div className="flex flex-wrap space-y-5">
              {gamesArray.map((game) => (
                <a href="#" key={game.key} className="bg-neutral-900 w-full rounded-xl p-5 flex text-white">
                  <img src={game.image} className="h-[150px] object-cover rounded-xl" />
                  <div className="px-5">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <ScoreButton initialScore={game.score} />
                        <button className="bg-neutral-700 text-white rounded-full px-4 py-1">29<i className="fa-regular fa-comment ml-3"></i></button>
                        {game.tags.map((tag, index) => (
                          <div key={index}>
                            <p className="min-w-[80px] text-orange-500 px-3 py-1 bg-neutral-700 rounded-full">{tag.name}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2 items-end">
                        <h1 className="text-white text-2xl">{game.titre}</h1>
                        <p className="text-orange-500">{game.prix} €</p>
                      </div>
                      <p className="text-wrap text-start text-gray-300">{game.description}</p>
                    </div>
                  </div>
                  <div className="w-[15%] h-full space-y-8 flex flex-col justify-between">
                    <div className="flex items-center space-x-2">
                      <p>{game.auteur.pseudo}</p><img src={game.auteur.image} className="h-[40px] w-[40px] rounded-full" />
                    </div>
                    <button className="bg-orange-500 rounded-xl py-1 px-2 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-600">
                      Voir le jeu
                      <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                    </button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1>Bienvenue sur BonPlanJV</h1>
    </main>
  );
}
