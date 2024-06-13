/* eslint-disable react/prop-types */
import ScoreButton from "../components/ScoreButton";
import defaultPP from "../assets/defaultProfile.webp"
import { useState, useEffect } from "react";
import { getCommentsByGameID } from "../firebase/database";

const Game = (props) => {
  const game = props.game;

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

  // Copy promo code
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigator.clipboard.writeText(game.promoCode);
    setIsCopied(true);
  };
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000); // hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <a
      href={`/games/${game.key}`}
      key={game.key}
      className="bg-neutral-900 w-full rounded-xl p-5 flex text-white"
    >
      <img src={game.picture} className="h-[150px] object-cover rounded-xl" />
      <div className="px-5">
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
                  {tag.name}
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
            {game.description.substring(0, 250) + "..."}
          </p>
        </div>
      </div>
      <div className="w-[13%] h-full space-y-3 flex flex-col justify-between flex-shrink-0 flex-basis-auto">
        <div className="flex justify-end items-center space-x-2">
          <p>{game.auteur?.username ?? 'Deleted User'}</p>
          <img
            src={game.auteur?.picture ?? defaultPP}
            className="h-[40px] w-[40px] rounded-full"
          />
        </div>
        {game.promoCode && (
          <div className="relative">
            <button
              className="text-center rounded-full w-full px-4 py-2 border-2 border-orange-500 border-dotted hover:border-orange-800 transition-colors duration-200"
              onClick={handleCopy}
            >
              {game.promoCode}
              <i className="fa-regular fa-copy ml-2"></i>
            </button>
            <div
              className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-all duration-300 bg-gray-900 rounded-lg shadow-sm ${isCopied ? "opacity-100 visible" : "opacity-0 invisible"} bottom-full left-1/2 transform -translate-x-1/2 mt-2`}
            >
              Copié dans le presse papier
            </div>
          </div>
        )}
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
    </a>
  );
}

export default Game;
