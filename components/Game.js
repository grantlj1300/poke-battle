import styles from "../styles/Game.module.css";
import GameMenu from "./GameMenu/GameMenu";
import Opponent from "./Player/Opponent";
import User from "./Player/User";

export default function Game() {
  const userPokemon = {
    name: "Charmander",
    level: 5,
    image:
      "https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif",
    hp: {
      current: 50,
      max: 100,
    },
  };
  const opponentPokemon = {
    name: "Squirtle",
    level: 4,
    image:
      "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif",
    hp: {
      current: 25,
      max: 100,
    },
  };
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
