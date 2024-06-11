import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import { useState, useEffect } from "react";
import background from "../assets/background.jpeg"
import Game from "../components/Game.jsx";

export default function News() {
  const [gamesArray, setGamesArray] = useState([]);
  useEffect(() => {
    readData("games").then((games) => {
      Promise.all(
        Object.entries(games).map(async (gameEntries) => {
          const key = gameEntries[0];
          const game = gameEntries[1];
          const user = await getUserByID(game.auteur);
          const tags = await Promise.all(
            game.tags.map(async (tagID) => {
              const tag = await getTagByID(tagID);
              return tag;
            })
          );
          return { ...game, auteur: user, tags: tags, key: key };
        })
      ).then((gamesWithUser) => {
        gamesWithUser.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
        setGamesArray(gamesWithUser);
      });
    });
  }, []);

  return (
    <main className="h-screen w-full text-center mx-auto text-gray-700">
      <img className="fixed overflow overflow-scroll z-1 h-full w-full bg-center bg-cover" src={background} alt="" />
      <div className="highlights-container"></div>
      <div className="absolute h-screen w-full">
        <div className="h-[15vh] w-full bg-neutral-800"></div>
        <div className="h-full w-full bg-neutral-800 p-5 flex justify-center">
          <div className="w-[90%] h-full space-y-10">
            <h1 className="text-4xl text-white text-start absolute top-20">
              Nouveautés
            </h1>
            <div className="flex flex-wrap space-y-5">
              {gamesArray.map((game) => (
                <Game key={game.key} game={game} />  
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1>Bienvenue sur BonPlanJV</h1>
    </main>
  );
}
