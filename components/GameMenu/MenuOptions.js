import { useEffect, useState } from "react";
import styles from "@styles/GameMenu/MenuOptions.module.css";

export default function MenuOptions() {
  const [selectedOption, setSelectedOption] = useState("fight");

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        if (selectedOption === "pokemon") setSelectedOption("fight");
        else if (selectedOption === "run") setSelectedOption("bag");
        break;
      case "ArrowDown":
        if (selectedOption === "fight") setSelectedOption("pokemon");
        else if (selectedOption === "bag") setSelectedOption("run");
        break;
      case "ArrowRight":
        if (selectedOption === "fight") setSelectedOption("bag");
        else if (selectedOption === "pokemon") setSelectedOption("run");
        break;
      case "ArrowLeft":
        if (selectedOption === "bag") setSelectedOption("fight");
        else if (selectedOption === "run") setSelectedOption("pokemon");
        break;
      case "Enter":
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption]);

  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <div className={styles.option}>
          <div
            className={`${styles.arrow} ${
              selectedOption === "fight" ? "" : styles.hidden
            }`}
          >
            &#9658;
          </div>
          <div
            className={styles.text}
            onClick={() => setSelectedOption("fight")}
          >
            Fight
          </div>
        </div>
        <div className={styles.option}>
          <div
            className={`${styles.arrow} ${
              selectedOption === "pokemon" ? "" : styles.hidden
            }`}
          >
            &#9658;
          </div>
          <div
            className={styles.text}
            onClick={() => setSelectedOption("pokemon")}
          >
            Pokemon
          </div>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.option}>
          <div
            className={`${styles.arrow} ${
              selectedOption === "bag" ? "" : styles.hidden
            }`}
          >
            &#9658;
          </div>
          <div className={styles.text} onClick={() => setSelectedOption("bag")}>
            Bag
          </div>
        </div>
        <div className={styles.option}>
          <div
            className={`${styles.arrow} ${
              selectedOption === "run" ? "" : styles.hidden
            }`}
          >
            &#9658;
          </div>
          <div className={styles.text} onClick={() => setSelectedOption("run")}>
            Run
          </div>
        </div>
      </div>
    </div>
  );
}
