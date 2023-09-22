import CancelButton from "@components/CancelButton";
import styles from "@styles/GameMenu/PokemonSelector/PokemonSelector.module.css";
import PokemonCard from "./PokemonCard";
import { useState } from "react";

export default function PokemonSelector({
  pokemon,
  toMainMenu,
  switchPokemon,
  fainted,
}) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [hoveredOption, setHoveredOption] = useState("shift");
  return (
    <div className={styles.container}>
      <div className={styles.borderImage} />
      <div className={styles.options}>
        <div className={styles.mainOption}>
          <PokemonCard
            main
            pokemon={pokemon[0]}
            selected={selectedPokemon === 0}
            setSelectedPokemon={setSelectedPokemon}
            index={0}
          />
        </div>
        <div className={styles.secondaryOptions}>
          {[
            ...pokemon.slice(1, 6),
            ...Array(6 - Math.min(5, pokemon.length)).fill(null),
          ].map((poke, index) => (
            <PokemonCard
              key={index}
              pokemon={poke}
              selected={selectedPokemon === index + 1}
              setSelectedPokemon={setSelectedPokemon}
              index={index + 1}
            />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        {selectedPokemon !== null ? (
          <>
            <div className={styles.prompt}>Do what with this Pokemon?</div>
            <div className={styles.shiftOptions}>
              {pokemon[selectedPokemon].health.current !== 0 && (
                <div
                  className={styles.shiftOption}
                  onClick={() => switchPokemon(selectedPokemon)}
                  onMouseOver={() => setHoveredOption("shift")}
                >
                  <div
                    className={`${styles.arrow} ${
                      hoveredOption === "shift" ? "" : styles.hidden
                    }`}
                  >
                    &#9658;
                  </div>
                  Shift
                </div>
              )}
              <div
                className={styles.shiftOption}
                onClick={() => setSelectedPokemon(null)}
                onMouseOver={() => setHoveredOption("cancel")}
              >
                <div
                  className={`${styles.arrow} ${
                    hoveredOption === "cancel" ? "" : styles.hidden
                  }`}
                >
                  &#9658;
                </div>
                Cancel
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.prompt}>Choose a Pokemon.</div>
            {!fainted && (
              <div className={styles.cancel}>
                <CancelButton onClick={toMainMenu} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
