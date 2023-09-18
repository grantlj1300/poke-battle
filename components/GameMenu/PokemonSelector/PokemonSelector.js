import CancelButton from "@components/CancelButton";
import styles from "@styles/GameMenu/PokemonSelector/PokemonSelector.module.css";
import PokemonCard from "./PokemonCard";

export default function PokemonSelector({ pokemon, toMainMenu }) {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.mainOption}>
          <PokemonCard pokemon={pokemon[0]} />
        </div>
        <div className={styles.secondaryOptions}>
          {[
            ...pokemon.slice(1, 6),
            ...Array(6 - Math.min(5, pokemon.length)).fill(null),
          ].map((poke, index) => (
            <PokemonCard key={index} pokemon={poke} />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>Choose a Pokemon.</div>
        <CancelButton onClick={toMainMenu} />
      </div>
    </div>
  );
}
