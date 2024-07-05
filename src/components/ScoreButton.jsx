import { useEffect, useState } from "react";
import { createVote, getUserVote } from "../firebase/database";
import { useNavigate } from "react-router-dom";

function ScoreButton({ game }) {
  const userID = sessionStorage.getItem("userID");
  const [score, setScore] = useState(game.score);
  const [userVote, setUserVote] = useState(false);
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserVote(game, userID).then((vote) => setUserVote(vote));
  });

  const addVote = (game, voteType) => {
    if (userID === null) return navigate("/login");
    if (userVote) return;
    createVote(game, userID, voteType).then(() =>
      setScore(score + (voteType ? 1 : -1)),
    );
  };

  return (
    <div
      className={`bg-neutral-700 font-bold text-white text-center rounded-full flex justify-between items-center px-3 border-2 ${
        (!userVote && isMinusHovered) ||
        (userVote && userVote.voteType === false)
          ? "border-red-500"
          : (!userVote && isPlusHovered) ||
              (userVote && userVote.voteType === true)
            ? "border-green-500"
            : "border-neutral-700"
      }`}
    >
      <button
        className="text-red-500 flex items-center justify-center"
        onMouseEnter={() => setIsMinusHovered(true)}
        onMouseLeave={() => setIsMinusHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          addVote(game, false);
        }}
      >
        -
      </button>
      <span className="mx-4 font-normal">{score}</span>
      <button
        className="text-green-500 flex items-center justify-center"
        onMouseEnter={() => setIsPlusHovered(true)}
        onMouseLeave={() => setIsPlusHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          addVote(game, true);
        }}
      >
        +
      </button>
    </div>
  );
}

export default ScoreButton;
