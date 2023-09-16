import styles from "@styles/Player/Player.module.css";
import Status from "./Status";

export default function Opponent({ pokemon, animation, health }) {
  return (
    <div className={`${styles.container} ${styles[animation]}`}>
      <img
        className={styles.enemySprite}
        src={pokemon.image}
        alt={pokemon.name}
      />
      <Status pokemon={pokemon} health={health} />
    </div>
  );
}
