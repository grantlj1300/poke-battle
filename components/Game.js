import styles from "@styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";
import pokemon from "@shared/pokemon.json";
import { useBattleSequence } from "@hooks/useBattleSequence";
import { useEffect, useState } from "react";
import { useAIOpponent } from "@hooks/useAIOpponent";

export default function Game({ onGameEnd }) {
  const playerPokemonBase = [pokemon.charmander, pokemon.squirtle];
  const opponentPokemonBase = [pokemon.squirtle];
  const [sequence, setSequence] = useState({});
  const {
    turn,
    inSequence,
    playerPokemon,
    playerAnimation,
    opponentPokemon,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence, playerPokemonBase, opponentPokemonBase);
  const aiChoice = useAIOpponent(turn, opponentPokemon[0].moves);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  return (
    <div className={styles.container}>
      <div className={styles.battleContainer}>
        <Opponent
          pokemon={opponentPokemon[0]}
          animation={opponentAnimation}
          health={opponentPokemon[0].health ?? opponentPokemon[0].maxHP}
        />
        <User
          pokemon={playerPokemon[0]}
          animation={playerAnimation}
          health={playerPokemon[0].health ?? playerPokemon[0].maxHP}
        />
      </div>
      <GameMenu
        turn={turn}
        setSequence={setSequence}
        displayOptions={turn === 0 && !inSequence}
        moves={playerPokemon[0].moves}
        message={announcerMessage || `What will ${playerPokemon[0].name} do?`}
        pokemon={playerPokemon}
        onGameEnd={onGameEnd}
      />
    </div>
  );
}
