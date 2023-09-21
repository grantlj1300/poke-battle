import styles from "@styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";
import pokemon from "@shared/pokemon.json";
import { useBattleSequence } from "@hooks/useBattleSequence";
import { useEffect, useState } from "react";
import { AIOpponentMove } from "@shared/helpers";

export default function Game({ onGameEnd }) {
  const playerPokemonBase = [pokemon.charmander, pokemon.squirtle].map(
    (pokemon) => ({ ...pokemon })
  );
  const opponentPokemonBase = [pokemon.squirtle, pokemon.charmander].map(
    (pokemon) => ({
      ...pokemon,
    })
  );
  const [sequence, setSequence] = useState({});
  const {
    gameStatus,
    turn,
    inSequence,
    playerPokemon,
    playerAnimation,
    opponentPokemon,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence, playerPokemonBase, opponentPokemonBase);

  useEffect(() => {
    if (turn === 1 && !inSequence) {
      setSequence({
        turn,
        mode: AIOpponentMove(turn, opponentPokemon, gameStatus),
      });
    }
  }, [turn, inSequence]);

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
        gameStatus={gameStatus}
        displayOptions={turn === 0 && !inSequence && gameStatus === "playing"}
        moves={playerPokemon[0].moves}
        message={announcerMessage || `What will ${playerPokemon[0].name} do?`}
        pokemon={playerPokemon}
        onGameEnd={onGameEnd}
      />
    </div>
  );
}
