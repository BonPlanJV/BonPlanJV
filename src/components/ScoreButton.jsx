import { useState } from "react";
import { createVote } from "../firebase/database";
import PropTypes from "prop-types";

function ScoreButton(props) {
  const game = props.game;
  const [score, setScore] = useState(game.score);
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  return (
    <div
      className={`bg-neutral-700 font-bold text-white text-center rounded-full flex justify-between items-center px-3 border-2 ${
        isMinusHovered
          ? "border-red-500"
          : isPlusHovered
            ? "border-green-500"
            : "border-neutral-700"
      }`}
    >
      <button
        className="text-red-500 flex items-center justify-center"
        onMouseEnter={() => setIsMinusHovered(true)}
        onMouseLeave={() => setIsMinusHovered(false)}
        onClick={() => {
          createVote(game, sessionStorage.getItem("userID"), false);
          setScore(score() - 1);
        }}
      >
        -
      </button>
      <span className="mx-4 font-normal">{score}</span>
      <button
        className="text-green-500 flex items-center justify-center"
        onMouseEnter={() => setIsPlusHovered(true)}
        onMouseLeave={() => setIsPlusHovered(false)}
        onClick={() => {
          createVote(game, sessionStorage.getItem("userID"), true);
          setScore(score() + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

ScoreButton.propTypes = {
  game: PropTypes.number.isRequired,
};

export default ScoreButton;
