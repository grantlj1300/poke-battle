import styles from "@styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";
import pokemon from "@shared/pokemon.json";

export default function Game() {
  const userPokemon = pokemon.charmander;
  const opponentPokemon = pokemon.squirtle;
  return (
    <div className={styles.container}>
      <div className={styles.battleContainer}>
        <User pokemon={userPokemon} />
        <Opponent pokemon={opponentPokemon} />
      </div>
      <GameMenu />
    </div>
  );
}
