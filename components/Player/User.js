import styles from "@styles/Player/Player.module.css";
import Status from "./Status";

export default function User({ pokemon, animation }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.userSprite} ${styles.scale}`}>
        <img
          className={styles[animation]}
          src={pokemon.sprites.back}
          alt={pokemon.name}
        />
      </div>
      <Status user pokemon={pokemon} />
    </div>
  );
}
