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
import defaultPP from "../assets/defaultProfile.webp";
import PromoCopy from "../components/PromoCopy";
import { useNotification } from "../core/notificationContext";
import FavoriteStar from "../components/FavoriteStar.jsx";

export default function Games() {
  const { key } = useParams();
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [comment, setComment] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    readData(`games/${key}`).then(async (game) => {
      const user = await getUserByID(game?.auteur);
      const tags = game.tags ? await Promise.all(
        game.tags.map(async (tagID) => {
          const tag = await getTagByID(tagID);
          return tag;
        })
      ) : null;

      setGame({ ...game, auteur: user, tags: tags, key: key });
      document.title = "BonPlanJV - " + game?.titre;
    });

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

  // Post comment
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!comment) {
      showNotification("Comment cannot be empty", "error");
      return;
    }

    const date = new Date();
    const commentData = {
      gameID: key,
      auteur: sessionStorage.getItem("userID"),
      message: comment,
      date: date.toISOString(),
    };
    pushData("commentaires", commentData);
    game.nombreCommentaires += 1;
    updateData(`games/${key}`, {
      nombreCommentaires: game?.nombreCommentaires,
    });
    setComment("");
    setRefreshComments(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Lien copié dans le presse-papier", "success");
  };

  function formatDate(dateString) {
    const commentDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - commentDate; // différence en millisecondes
    const diffSecs = Math.floor(diffMs / 1000); // convertir en secondes
    const diffMins = Math.floor(diffSecs / 60); // convertir en minutes
    const diffHrs = Math.floor(diffMins / 60); // convertir en heures

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs}h ago`;
    } else if (now.getFullYear() === commentDate.getFullYear()) {
      return commentDate.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
      });
    } else {
      return commentDate.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
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
                    <FavoriteStar game={game} />
                    <button
                      className="rounded-full px-2 hover:text-orange-500 ml-1"
                      onClick={handleShare}
                    >
                      <i className="fa-regular fa-share-from-square px-1"></i>{" "}
                      Share
                    </button>
                    <button
                      className="rounded-full px-2 hover:text-orange-500"
                      onClick={() =>
                        document
                          .getElementById("commentaires")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                    >
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
                            ((game?.prixInit - game?.prix) / game?.prixInit) *
                              100
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
                    Open offer
                    <i className="fa-solid fa-arrow-up-right-from-square ml-3"></i>
                  </button>
                  <PromoCopy game={game} />
                  <div className="flex space-x-2 py-2 items-center text-gray-300">
                    <img
                      src={game.auteur?.picture ?? defaultPP}
                      className="h-[30px] w-[30px] rounded-full"
                    />
                    <p>
                      Shared by{" "}
                      <span className="text-orange-500">
                        {game.auteur?.username ?? "Deleted User"}
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
            <h1 className="text-xl text-left">About the game</h1>
            <p className="text-left text-gray-300 mt-2">{game?.description}</p>
            {game.tags && (
              <>
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
              </>
            )}
          </div>

          <div
            id="game"
            className="w-[90%] mx-auto bg-neutral-900 p-5 rounded-xl mt-2 max-w-[800px]"
          >
            <h1 className="text-xl text-left" id="commentaires">
              Comments
            </h1>
            {sessionStorage.getItem("userID") && (
              <div className="flex flex-col space-y-2 mt-4">
                <textarea
                  id="comment"
                  className="w-full h-24 bg-neutral-800 text-gray-300 rounded-xl p-4"
                  placeholder="Your comment..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors duration-200"
                  onClick={handleCommentSubmit}
                >
                  Send
                </button>
              </div>
            )}
            {!sessionStorage.getItem("userID") && (
              <div className="flex flex-col space-y-2 mt-4">
                <p className="text-gray-300 text-left">
                  You must be logged in to leave a comment
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
                    {comment.auteur?.username ?? "Deleted User"}{" "}
                    <span className="text-gray-400 text-sm">
                      {" "}
                      • {formatDate(comment.date)}
                    </span>
                  </p>
                  <p className="text-gray-300 text-left whitespace-pre-wrap truncate">{comment.message}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </main>
  );
}
