import styles from "@styles/Player/Player.module.css";
import Status from "./Status";

export default function User({ pokemon }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.userSprite}
        src={pokemon.image}
        alt={pokemon.name}
      />
      <Status user pokemon={pokemon} />
    </div>
  );
}
