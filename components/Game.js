import styles from "@styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";
import pokemon from "@shared/pokemon.json";
import items from "@shared/items.json";
import { useBattleSequence } from "@hooks/useBattleSequence";
import { useEffect, useState } from "react";
import { AIOpponentMove } from "@shared/helpers";

export default function Game({ onGameEnd }) {
  const playerPokemonBase = [pokemon.charmander, pokemon.squirtle].map(
    (pokemon) => ({ ...pokemon })
  );
  const playerItemsBase = [items.potion].map((item) => ({ ...item }));
  const opponentPokemonBase = [pokemon.squirtle, pokemon.charmander].map(
    (pokemon) => ({
      ...pokemon,
    })
  );
  const opponentItemsBase = [items.potion].map((item) => ({ ...item }));
  const [sequence, setSequence] = useState({});
  const {
    gameStatus,
    turn,
    inSequence,
    playerPokemon,
    playerItems,
    playerAnimation,
    opponentPokemon,
    opponentItems,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(
    sequence,
    playerPokemonBase,
    playerItemsBase,
    opponentPokemonBase,
    opponentItemsBase
  );

  useEffect(() => {
    if (gameStatus === "win" || gameStatus === "lose") {
      onGameEnd();
    }
    if (turn === 1 && !inSequence) {
      setSequence({
        turn,
        mode: AIOpponentMove(turn, opponentPokemon, gameStatus),
      });
    }
  }, [turn, inSequence, gameStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.battleContainer}>
        <Opponent pokemon={opponentPokemon[0]} animation={opponentAnimation} />
        <User pokemon={playerPokemon[0]} animation={playerAnimation} />
      </div>
      <GameMenu
        turn={turn}
        setSequence={setSequence}
        gameStatus={gameStatus}
        displayOptions={turn === 0 && !inSequence && gameStatus === "playing"}
        message={announcerMessage || `What will ${playerPokemon[0].name} do?`}
        items={playerItems}
        pokemon={playerPokemon}
        onGameEnd={onGameEnd}
      />
    </div>
  );
}
