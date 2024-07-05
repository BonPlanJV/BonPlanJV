import { readData, getUserByID, getTagByID, getFavoriteGames } from "../firebase/database.jsx";
import { useState, useEffect } from "react";
import background from "../assets/background.jpeg";
import Game from "../components/Game.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { useNavigate } from "react-router-dom";
import loading from '../assets/loading.png'

export default function Home({ sort = 0, getFavorites = false }) {
  const [gamesArray, setGamesArray] = useState([]);
  const [favorites, setFavorite] = useState([]);
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")

  if (getFavorites && userID == null) navigate("/login")

  useEffect(() => {
    const sortingMethod = [
      (a, b) => b.score - a.score,
      (a, b) => new Date(a.dateCreation) - new Date(b.dateCreation),
      (a, b) => b.nombreCommentaires - a.nombreCommentaires,
    ];

    const formatGames = async (games) => {
      const gamesWithDetails = [];

      for (const [key, game] of Object.entries(games)) {
        const user = await getUserByID(game.auteur);
        const tags = await Promise.all(
          (game.tags || []).map((tagID) => getTagByID(tagID))
        ); 
        gamesWithDetails.push({ ...game, auteur: user, tags, key});
      } return gamesWithDetails
    }

    const fetchGamesWithDetails = async () => {
      const games = getFavorites ? await getFavoriteGames(userID) : await readData("games");
      const gamesWithDetails = await formatGames(games)

      getFavorites ? setFavorite(gamesWithDetails) : setGamesArray(gamesWithDetails.sort(sortingMethod[sort]));
    };

    document.addEventListener("favorite", () => {
      if (getFavorites) fetchGamesWithDetails()
    });


    fetchGamesWithDetails();
    document.title = "BonPlanJV - " + (getFavorites ? "Favorites" : (sort === 0 ? "Trending" : sort === 1 ? "News" : "Comments"));
  }, [getFavorites, sort, userID]);

  return (
    <main className="h-full w-full text-center mx-auto text-gray-700">
      <img
        className="absolute h-full w-full bg-center bg-cover bg-no-repeat"
        src={background}
        alt=""
      />
      <div className="highlights-container"></div>
      <div className="h-full w-full">
        <div className="absolute h-full w-full">
          <div className="h-[5vh] w-full bg-neutral-800"></div>
          <div className="h-full w-full bg-neutral-800 p-5 flex justify-center">
            <div className="w-[90%] h-full space-y-10">
              <PageTitle title={getFavorites ? "Favorites" : (sort === 0 ? "Trending games" : sort === 1 ? "News" : "Most commented")} />
              <div className="flex flex-wrap space-y-5">
                {
                getFavorites ? favorites.map((game) => (
                  <Game key={game.key} game={game} />
                )) : gamesArray.length > 0 ?
                  gamesArray.map((game) => (
                    <Game key={game.key} game={game} />
                  )) : 
                  <div className="w-full min-h-[40vh] flex justify-center items-center text-6xl text-white">
                    <img className="bg-transparent animate-spin w-28 invert" src={loading} alt="" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
