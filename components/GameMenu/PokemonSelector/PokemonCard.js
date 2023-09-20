import HealthBar from "@components/HealthBar";
import styles from "@styles/GameMenu/PokemonSelector/PokemonCard.module.css";

export default function PokemonCard({
  main = false,
  pokemon,
  selected,
  setSelectedPokemon,
  index,
}) {
  if (pokemon === null) {
    return <div className={`${styles.container} ${styles.empty}`} />;
  }
  return (
    <div
      className={`${styles.container} ${main ? styles.main : ""} ${
        selected ? styles.selected : ""
      }`}
      style={{ flexDirection: main ? "column" : "row" }}
      onClick={() => setSelectedPokemon(index)}
    >
      <img
        className={styles.sprite}
        src={pokemon.sprites.front}
        alt={pokemon.name}
      />
      <div className={styles.info}>
        <div>{pokemon.name}</div>
        <div>Lvl. {pokemon.level}</div>
      </div>
      <div className={styles.health}>
        <HealthBar user={true} current={10} max={10} />
      </div>
    </div>
  );
}
