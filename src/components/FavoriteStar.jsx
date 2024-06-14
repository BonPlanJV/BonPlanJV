import { useState, useEffect } from "react";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteByGameID,
} from "../firebase/database";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../core/notificationContext";

const FavoriteStar = ({ game }) => {
  const userID = sessionStorage.getItem("userID");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    getFavoriteByGameID(game.key, userID).then((favorite) =>
      setIsFavorite(favorite)
    );
  }, [game, userID]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userID === null) return navigate("/login");
    isFavorite ? deleteFavorite(game, userID) : createFavorite(game, userID);
    setIsFavorite(!isFavorite);
    showNotification(isFavorite ? `${game.titre} removed from favorites` : `${game.titre} added to favorites`, isFavorite ? "error" : "success");
  };

  return (
    <button onClick={toggleFavorite} className="rounded-full">
      <i
        className={
          isFavorite
            ? "fa-solid fa-star text-yellow-500 hover:text-orange-500"
            : "fa-regular fa-star hover:text-orange-500"
        }
      ></i>
    </button>
  );
};

export default FavoriteStar;
