import ScoreButton from "../components/ScoreButton";
import defaultPP from "../assets/defaultProfile.webp";
import { useState, useEffect } from "react";
import { getCommentsByGameID } from "../firebase/database";
import PromoCopy from "./PromoCopy";
import { Link } from 'react-router-dom';

const Game = ({ game }) => {

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    async function fetchComments() {
      const comments = await getCommentsByGameID(game.key);
      if (comments) {
        setCommentCount(comments.length);
      } else {
        setCommentCount(0);
      }
    }
    fetchComments();
  }, [game.key]);

  return (
    <Link
      to={`/games/${game.key}`}
      key={game.key}
      className="bg-neutral-900 w-full rounded-xl p-5 flex justify-between text-white"
    >
      <img src={game.image} className="h-[150px] object-cover rounded-xl" />
      <div className="flex-grow px-5">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <ScoreButton game={game} />
            <button className="bg-neutral-700 text-white rounded-full px-4 py-1">
              {commentCount}
              <i className="fa-regular fa-comment ml-3"></i>
            </button>
            {game.tags.map((tag, index) => (
              <div key={index}>
                <p className="bg-orange-500 rounded-full px-3 py-1">
                  {tag?.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 items-end">
            <h1 className="text-white text-2xl">{game.titre}</h1>
            <p className="text-orange-500 text-2xl">{game.prix} €</p>
            {game.prixInit && (
              <>
                <p className="text-gray-400 line-through italic">
                  {game.prixInit} €
                </p>
                <p className="text-orange-400">
                  -
                  {Math.round(
                    ((game.prixInit - game.prix) / game.prixInit) * 100
                  )}
                  %
                </p>
              </>
            )}
          </div>
          <p className="text-wrap text-start text-gray-300">
            {game.description?.substring(0, 250) + "..."}
          </p>
        </div>
      </div>
      <div className="w-[13%] h-full space-y-3 flex flex-col justify-between flex-shrink-0 flex-basis-auto">
        <div className="flex justify-end items-center space-x-2">
          <p>{game.auteur?.username ?? "Deleted User"}</p>
          <img
            src={game.auteur?.picture ?? defaultPP}
            className="h-[40px] w-[40px] rounded-full"
          />
        </div>
        <PromoCopy game={game} />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors duration-200"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          Voir le jeu
          <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
        </button>
      </div>
    </Link>
  );
};

export default Game;
