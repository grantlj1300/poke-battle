import styles from "@styles/Player/Player.module.css";
import Status from "./Status";

export default function User({ pokemon, animation, health }) {
  return (
    <div className={`${styles.container} ${styles[animation]}`}>
      <img
        className={styles.userSprite}
        src={pokemon.sprites.back}
        alt={pokemon.name}
      />
      <Status user pokemon={pokemon} health={health} />
    </div>
  );
}
