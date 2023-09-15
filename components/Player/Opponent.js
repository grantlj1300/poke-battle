import styles from "../../styles/Player/Player.module.css";
import Status from "./Status";

export default function Opponent({ pokemon }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.enemySprite}
        src={pokemon.image}
        alt={pokemon.name}
      />
      <Status pokemon={pokemon} />
    </div>
  );
}
