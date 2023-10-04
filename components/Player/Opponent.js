import styles from "@styles/Player/Player.module.css";
import Status from "./Status";

export default function Opponent({ pokemon, animation }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.enemySprite} ${styles.scale}`}>
        <img
          className={styles[animation]}
          src={pokemon.sprites.front}
          alt={pokemon.name}
        />
      </div>
      <Status pokemon={pokemon} />
    </div>
  );
}
