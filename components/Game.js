import styles from "../styles/Game.module.css";
import MenuOptions from "./GameMenu/MenuOptions";
export default function Game() {
  return (
    <div className={styles.container}>
      <div className={styles.battleContainer}>
        <img
          className={styles.userSprite}
          src="https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif"
          alt="Charmander"
        />
        <img
          className={styles.enemySprite}
          src="https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif"
          alt="Squirtle"
        />
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.bottomMenu}>What will Charmander do?</div>
        <MenuOptions />
      </div>
    </div>
  );
}
