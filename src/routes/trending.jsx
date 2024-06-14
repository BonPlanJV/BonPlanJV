import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import { useState, useEffect } from "react";
import background from "../assets/background.jpeg"
import Game from "../components/Game.jsx";

export default function Trending() {
  const [gamesArray, setGamesArray] = useState([]);
  useEffect(() => {
    readData("games").then((games) => {
      setGamesArray(
        Object.entries(games).map((gameEntries) => {
          const key = gameEntries[0];
          const game = gameEntries[1];
          const user = getUserByID(game.auteur);
          const tags = []
          game.tags?.map((tagID) => {
            getTagByID(tagID).then(tag => tags.push(tag))
          })
          return { ...game, auteur: user, tags, key };
        }).sort((a, b) =>  b.score - a.score)
      )
      })
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
