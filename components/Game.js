import styles from "@styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";
import pokemon from "@shared/pokemon.json";
import { useBattleSequence } from "@hooks/useBattleSequence";
import { useEffect, useState } from "react";
import { useAIOpponent } from "@hooks/useAIOpponent";

export default function Game({ onGameEnd }) {
  const userPokemon = pokemon.charmander;
  const opponentPokemon = pokemon.squirtle;
  const [sequence, setSequence] = useState({});
  const {
    turn,
    inSequence,
    playerHealth,
    playerMoves,
    playerAnimation,
    opponentHealth,
    opponentMoves,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence, userPokemon, opponentPokemon);
  const aiChoice = useAIOpponent(turn, opponentMoves);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  return (
    <div className={styles.container}>
      <div className={styles.battleContainer}>
        <Opponent
          pokemon={opponentPokemon}
          animation={opponentAnimation}
          health={opponentHealth}
        />
        <User
          pokemon={userPokemon}
          animation={playerAnimation}
          health={playerHealth}
        />
      </div>
      <GameMenu
        turn={turn}
        displayOptions={turn === 0 && !inSequence}
        moves={playerMoves}
        message={announcerMessage || `What will ${userPokemon.name} do?`}
        setSequence={setSequence}
        onGameEnd={onGameEnd}
      />
    </div>
  );
}
