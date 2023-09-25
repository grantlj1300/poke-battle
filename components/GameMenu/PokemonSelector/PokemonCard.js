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
  const { stats, sprites, name, level } = pokemon;

  return (
    <div
      className={`${styles.container} ${main ? styles.main : ""} ${
        selected ? styles.selected : ""
      } ${stats.hp.current === 0 ? styles.fainted : ""}`}
      style={{ flexDirection: main ? "column" : "row" }}
      onClick={() => setSelectedPokemon(index)}
    >
      <img className={styles.sprite} src={sprites.front} alt={name} />
      <div className={styles.info}>
        <div>{name}</div>
        <div>Lvl. {level}</div>
      </div>
      <div className={styles.health}>
        <HealthBar user={true} current={stats.hp.current} max={stats.hp.max} />
      </div>
    </div>
  );
}
