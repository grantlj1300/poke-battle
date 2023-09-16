import { useEffect, useState } from "react";

/**
 * Custom hook for handling AI opponent actions.
 *
 * @param {number} turn - The current turn. Use 1 for AI Opponent and 0 for the User
 * @param {number} opponentMoves - The opponent's fighting moveset
 */
export function useAIOpponent(turn, opponentMoves) {
  const [aiChoice, setAICoice] = useState("");
  useEffect(() => {
    if (turn === 1) {
      const options = opponentMoves;
      setAICoice({
        type: "fight",
        move: options[Math.floor(Math.random() * options.length)],
      });
    }
  }, [turn]);
  return aiChoice;
}
