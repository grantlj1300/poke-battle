import { useEffect, useState } from "react";

/**
 * Custom hook for handling AI opponent actions.
 *
 * @param {number} turn - The current turn. Use 1 for AI Opponent and 0 for the User
 * @param {number} opponentPokemon - The opponent's pokemon roster
 * @param {number} gameStatus - The status of the game such as "fainted"
 */
export function useAIOpponent(turn, opponentPokemon, gameStatus) {
  const [aiChoice, setAICoice] = useState("");
  useEffect(() => {
    if (turn === 1) {
      if (gameStatus === "fainted") {
        setAICoice({ type: "pokemon", swapIdx: 1 });
      } else {
        const options = opponentPokemon[0].moves;
        setAICoice({
          type: "fight",
          move: options[Math.floor(Math.random() * options.length)],
        });
      }
    }
  }, [turn, gameStatus, opponentPokemon]);
  return aiChoice;
}
