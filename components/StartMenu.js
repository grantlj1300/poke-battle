import styles from "@styles/StartMenu.module.css";
import pokemon from "@shared/pokemon.json";

export default function StartMenu({ team, setTeam, onGameStart }) {
  function togglePokemonInTeam(poke) {
    if (team.some((member) => member.id === poke.id)) {
      setTeam((prevTeam) => prevTeam.filter((member) => member.id !== poke.id));
    } else if (team.length < 6) {
      setTeam((prevTeam) => [...prevTeam, poke]);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Build your team</div>
      <div>Select up to 6 Pokemon for your battle roster</div>
      <div className={styles.optionsContainer}>
        {pokemon.map((poke) => {
          const isSelected = team.some((member) => member.id === poke.id);
          const selectedPokemonIndex = team.findIndex(
            (member) => member.id === poke.id
          );

          return (
            <div
              key={poke.id}
              onClick={() => togglePokemonInTeam(poke)}
              className={`${styles.optionCard} ${
                isSelected ? styles.selected : ""
              }`}
            >
              <div className={styles.place}>
                {isSelected ? "#" + (selectedPokemonIndex + 1) : ""}
              </div>
              <img
                className={styles.optionImg}
                src={poke.sprites.front}
                alt={poke.name}
              />
              <div>
                #{poke.id} {poke.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.button} onClick={onGameStart}>
        Start
      </div>
    </div>
  );
}
