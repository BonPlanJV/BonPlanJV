import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import { useState, useEffect } from "react";
import background from "../assets/background.jpeg"
import Game from "../components/Game.jsx";

export default function Trending() {
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
        gamesWithUser.sort((a, b) => {
          return b.score - a.score;
        });

        setGamesArray(gamesWithUser);
      });
    });
  }, []);

  return (
    <main className="h-full w-full text-center mx-auto text-gray-700">
      <img className="absolute h-full w-full bg-center bg-cover bg-no-repeat" src={background} alt="" />
      <div className="highlights-container"></div>
      <div className="h-full w-full">
        <div className="absolute">
          <div className="h-[15vh] w-full bg-neutral-800"></div>
          <div className="h-full w-full bg-neutral-800 p-5 flex justify-center">
            <div className="w-[90%] h-full space-y-10">
              <h1 className="text-4xl text-white text-start absolute top-20">
                Jeux du moment
              </h1>
              <div className="flex flex-wrap space-y-5">
                {gamesArray.map((game) => (
                  <Game key={game.key} game={game} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
