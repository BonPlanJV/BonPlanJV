// ScoreButton.jsx

import { createSignal } from "solid-js";

function ScoreButton(props) {
    const [score, setScore] = createSignal(props.initialScore);
    const [isMinusHovered, setIsMinusHovered] = createSignal(false);
    const [isPlusHovered, setIsPlusHovered] = createSignal(false);

    return (
        <div
            class={`bg-neutral-700 font-bold text-white text-center rounded-full flex justify-between items-center px-3 border-2 ${isMinusHovered() ? "border-red-500" : isPlusHovered() ? "border-green-500" : "border-neutral-700"
                }`}
        >
            <button
                class="text-red-500 flex items-center justify-center"
                onMouseEnter={() => setIsMinusHovered(true)}
                onMouseLeave={() => setIsMinusHovered(false)}
                onClick={() => setScore(score() - 1)}
            >
                -
            </button>
            <span class="mx-4 font-normal">{score()}</span>
            <button
                class="text-green-500 flex items-center justify-center"
                onMouseEnter={() => setIsPlusHovered(true)}
                onMouseLeave={() => setIsPlusHovered(false)}
                onClick={() => setScore(score() + 1)}
            >
                +
            </button>
        </div>
    );
}

export default ScoreButton;
