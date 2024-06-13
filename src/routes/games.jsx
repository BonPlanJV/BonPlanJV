import {
  readData,
  updateData,
  getUserByID,
  getTagByID,
  getCommentsByGameID,
  pushData,
} from "../firebase/database.jsx";
import ScoreButton from "../components/ScoreButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Games() {
  const { key } = useParams();

  // Game
  const [game, setGame] = useState(null);
  useEffect(() => {
    readData(`games/${key}`).then(async (game) => {
      const user = await getUserByID(game?.auteur);
      const tags = await Promise.all(
        game.tags.map(async (tagID) => {
          const tag = await getTagByID(tagID);
          return tag;
        })
      );
      setGame({ ...game, auteur: user, tags: tags, key: key});
    });
  }, [key]);

  // Comments
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  useEffect(() => {
    getCommentsByGameID(key).then((commentsEntries) => {
      if (commentsEntries) {
        Promise.all(
          Object.entries(commentsEntries).map(async (commentEntries) => {
            const key = commentEntries[0];
            const comment = commentEntries[1];
            const user = await getUserByID(comment.auteur);
            return { ...comment, auteur: user, key: key };
          })
        ).then((commentsWithKey) => {
          commentsWithKey.sort((a, b) => new Date(b.date) - new Date(a.date));
          setComments(commentsWithKey);
          setRefreshComments(false);
        });
      } else {
        setComments([]);
      }
    });
  }, [key, refreshComments]);

  // Copy promo code
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(game?.promoCode);
    setIsCopied(true);
  };
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000); // hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  // Post comment
  const [comment, setComment] = useState("");
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const date = new Date();
    const commentData = {
      gameID: key,
      auteur: sessionStorage.getItem("userID"),
      message: comment,
      date: date.toISOString(),
    };
    pushData("commentaires", commentData);
    game.nombreCommentaires += 1;
    updateData(`games/${key}`, {nombreCommentaires: game?.nombreCommentaires });
    setComment("");
    setRefreshComments(true);
  };

  function formatDate(dateString) {
    const commentDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - commentDate; // différence en millisecondes
    const diffSecs = Math.floor(diffMs / 1000); // convertir en secondes
    const diffMins = Math.floor(diffSecs / 60); // convertir en minutes
    const diffHrs = Math.floor(diffMins / 60); // convertir en heures
  
    if (diffMins < 60) {
      return `Il y a ${diffMins}m`;
    } else if (diffHrs < 24) {
      return `Il y a ${diffHrs}h`;
    } else if (now.getFullYear() === commentDate.getFullYear()) {
      return commentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    } else {
      return commentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }

  return (
    <main className="text-center mx-auto text-gray-700 p-4 bg-neutral-800 h-full w-full text-white">
      {game && (
        <>
          <div
            id="game"
            className="w-[90%] mx-auto bg-neutral-900 p-5 rounded-xl mt-28 max-w-[800px]"
          >
            <div className="flex space-x-5">
              <img
                src={game.image}
                className="w-[200px] object-cover rounded-xl"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <div className="">
                    <ScoreButton key={game.key} game={game} />
                  </div>
                  <div>
                    <button className="rounded-full px-2 hover:text-orange-500">
                      <i className="fa-regular fa-share-from-square px-1"></i>{" "}
                      Partager
                    </button>
                    <button className="rounded-full px-2 hover:text-orange-500">
                      <i className="fa-regular fa-comment px-1"></i>{" "}
                      {comments.length}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 text-left my-6 mx-4">
                  <h1 className="text-3xl">{game?.titre}</h1>
                  <div className="flex space-x-2 py-6 items-end">
                    <h2 className="text-2xl text-orange-500">{game?.prix} €</h2>
                    {game.prixInit && (
                      <>
                        <h3 className="text-xl thin-strike italic text-gray-400">
                          {game.prixInit} €
                        </h3>
                        <h3
                          className="text-xl text-orange-400"
                          id="pourcentage"
                        >
                          -
                          {Math.round(
                            ((game?.prixInit - game?.prix) / game?.prixInit) * 100
                          )}
                          %
                        </h3>
                      </>
                    )}
                  </div>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors duration-200"
                    onClick={() => (window.location.href = game?.link)}
                  >
                    Voir le jeu
                    <i className="fa-solid fa-arrow-up-right-from-square ml-3"></i>
                  </button>
                  {game.promoCode && (
                    <div className="relative">
                      <button
                        className="text-center rounded-full w-full px-4 py-2 mt-4 border-2 border-orange-500 border-dotted hover:border-orange-800 transition-colors duration-200"
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
                  <div className="flex space-x-2 py-2 items-center text-gray-300">
                    <img
                      src={game.auteur?.picture}
                      className="h-[30px] w-[30px] rounded-full"
                    />
                    <p>
                      Partagé par{" "}
                      <span className="text-orange-500">
                        {game.auteur?.username}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="game"
            className="w-[90%] mx-auto bg-neutral-900 p-5 rounded-xl mt-2 max-w-[800px]"
          >
            <h1 className="text-xl text-left">À propos du jeu</h1>
            <p className="text-left text-gray-300 mt-2">{game?.description}</p>
            <h2 className="text-xl text-left mt-4">Tags</h2>
            <div className="flex flex-wrap space-x-2 mt-2">
              {game.tags.map((tag) => (
                <div
                  key={tag.key}
                  className="bg-orange-500 rounded-full px-3 py-1"
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          <div
            id="game"
            className="w-[90%] mx-auto bg-neutral-900 p-5 rounded-xl mt-2 max-w-[800px]"
          >
            <h1 className="text-xl text-left">Commentaires</h1>
            {sessionStorage.getItem("userID") && (
              <div className="flex flex-col space-y-2 mt-4">
                <textarea
                  id="comment"
                  className="w-full h-24 bg-neutral-800 text-gray-300 rounded-xl p-4"
                  placeholder="Votre commentaire..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors duration-200"
                  onClick={handleCommentSubmit}
                >
                  Envoyer
                </button>
              </div>
            )}
            {!sessionStorage.getItem("userID") && (
              <div className="flex flex-col space-y-2 mt-4">
                <p className="text-gray-300 text-left">
                  Vous devez être connecté pour laisser un commentaire
                </p>
              </div>
            )}
            {comments &&
              comments.map((comment) => (
                <div
                  key={comment.key}
                  className="bg-neutral-800 rounded-xl p-4 mt-4"
                >
                  <p className="text-orange-500 text-left">
                    {comment.auteur.username}{" "}
                    <span className="text-gray-400 text-sm">
                      {" "}
                      • {formatDate(comment.date)}
                    </span>
                  </p>
                  <p className="text-gray-300 text-left">{comment.message}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </main>
  );
}
