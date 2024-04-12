import { useState } from "react";
import PropTypes from "prop-types";

function ScoreButton(props) {
  const [score, setScore] = useState(props.initialScore);
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
        onClick={() => setScore(score - 1)}
      >
        -
      </button>
      <span className="mx-4 font-normal">{score}</span>
      <button
        className="text-green-500 flex items-center justify-center"
        onMouseEnter={() => setIsPlusHovered(true)}
        onMouseLeave={() => setIsPlusHovered(false)}
        onClick={() => setScore(score + 1)}
      >
        +
      </button>
    </div>
  );
}

ScoreButton.propTypes = {
  initialScore: PropTypes.number.isRequired,
};

export default ScoreButton;
