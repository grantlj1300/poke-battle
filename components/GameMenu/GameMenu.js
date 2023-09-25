import styles from "@styles/GameMenu/GameMenu.module.css";
import QuadSelector from "./QuadSelector";
import TextAnnouncer from "./TextAnnouncer";
import { useState } from "react";
import MoveInfo from "./MoveInfo";
import PokemonSelector from "./PokemonSelector/PokemonSelector";
import Bag from "./Bag/Bag";

export default function GameMenu({
  gameStatus,
  displayOptions,
  message,
  turn,
  setSequence,
  onGameEnd,
  items,
  pokemon,
}) {
  const moves = pokemon[0].moves;
  const [selectedOption, setSelectedOption] = useState("bag");
  const [previewedOption, setPreviewedOption] = useState(moves[0]);
  const mainMenuOptions = [
    { name: "fight" },
    { name: "bag" },
    { name: "pokemon" },
    { name: "run" },
  ];
  const confirmationOptions = [{ name: "yes" }, { name: "no" }];

  function toMainMenu() {
    setSelectedOption("");
  }

  function switchPokemon(swapIdx) {
    setSelectedOption("");
    setSequence({ turn, mode: { type: "pokemon", swapIdx } });
    return;
  }

  if (selectedOption === "fight") {
    return (
      <div className={styles.container}>
        <div style={{ minWidth: "70%", position: "relative" }}>
          <QuadSelector
            options={moves}
            onSelect={(move) => {
              setSelectedOption("");
              setSequence({ turn, mode: { type: "fight", move } });
            }}
            onBack={toMainMenu}
            onHover={(move) => setPreviewedOption(move)}
          />
        </div>
        <MoveInfo move={previewedOption} />
      </div>
    );
  } else if (selectedOption === "run") {
    return (
      <div className={styles.container}>
        <div style={{ minWidth: "60%", width: "100%" }}>
          <TextAnnouncer message={"Are you sure you want to quit?"} />
        </div>
        {displayOptions && (
          <QuadSelector
            options={confirmationOptions}
            onSelect={(menuOption) =>
              menuOption.name === "yes" ? onGameEnd() : setSelectedOption("")
            }
            onBack={toMainMenu}
          />
        )}
      </div>
    );
  } else
    return (
      <>
        {selectedOption === "bag" && (
          <div className={styles.modalContainer}>
            <div className={styles.shadowFade} />
            <Bag items={items} toMainMenu={toMainMenu} />
          </div>
        )}
        {(selectedOption === "pokemon" ||
          (gameStatus === "fainted" && turn === 0)) && (
          <div className={styles.modalContainer}>
            <div className={styles.shadowFade} />
            <PokemonSelector
              pokemon={pokemon}
              toMainMenu={toMainMenu}
              switchPokemon={switchPokemon}
              fainted={gameStatus === "fainted"}
            />
          </div>
        )}
        <div className={styles.container}>
          <div style={{ minWidth: "60%", width: "100%" }}>
            <TextAnnouncer message={message} />
          </div>
          {displayOptions && selectedOption === "" && (
            <QuadSelector
              options={mainMenuOptions}
              onSelect={(menuOption) => setSelectedOption(menuOption.name)}
            />
          )}
        </div>
      </>
    );
}
