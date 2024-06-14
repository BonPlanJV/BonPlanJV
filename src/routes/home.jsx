import { readData, getUserByID, getTagByID } from "../firebase/database.jsx";
import { useState, useEffect } from "react";
import background from "../assets/background.jpeg";
import Game from "../components/Game.jsx";

export default function Trending({ sort = 0 }) {
  const [gamesArray, setGamesArray] = useState([]);

  useEffect(() => {
    const sortingMethod = [
      (a, b) => b.score - a.score,
      (a, b) => new Date(a.dateCreation) - new Date(b.dateCreation),
      (a, b) => b.nombreCommentaires - a.nombreCommentaires,
    ];
    const fetchGamesWithDetails = async () => {
      const games = await readData("games");
      const gamesWithDetails = [];

      for (const [key, game] of Object.entries(games)) {
        const user = await getUserByID(game.auteur);
        const tags = await Promise.all(
          (game.tags || []).map((tagID) => getTagByID(tagID))
        );
        gamesWithDetails.push({ ...game, auteur: user, tags, key });
      }

      setGamesArray(gamesWithDetails.sort(sortingMethod[sort]));
    };

    fetchGamesWithDetails();
    document.title = "BonPlanJV - " + (sort === 0 ? "Trending" : sort === 1 ? "News" : "Comments");
  }, [sort]);

  return (
    <main className="h-full w-full text-center mx-auto text-gray-700">
      <img
        className="absolute h-full w-full bg-center bg-cover bg-no-repeat"
        src={background}
        alt=""
      />
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
