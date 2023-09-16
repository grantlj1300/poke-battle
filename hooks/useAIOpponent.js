import { useEffect, useState } from "react";

/**
 * Custom hook for handling AI opponent actions.
 *
 * @param {number} turn - The current turn. Use 1 for AI Opponent and 0 for the User
 */
export function useAIOpponent(turn) {
  const [aiChoice, setAICoice] = useState("");
  useEffect(() => {
    if (turn === 1) {
      const options = ["fight"];
      setAICoice(options[Math.floor(Math.random() * options.length)]);
    }
  }, [turn]);
  return aiChoice;
}
