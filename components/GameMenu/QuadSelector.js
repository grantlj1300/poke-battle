import { useEffect, useState } from "react";
import styles from "@styles/GameMenu/QuadSelector.module.css";

export default function QuadSelector({ options, onSelect }) {
  const [hoveredOption, setHoveredOption] = useState(0);

  function handleKeyDown(e) {
    let idx = hoveredOption;
    switch (e.key) {
      case "ArrowUp":
        idx -= 2;
        if (idx > -1) setHoveredOption((prev) => prev - 2);
        break;
      case "ArrowDown":
        idx += 2;
        if (idx < options.length) setHoveredOption((prev) => prev + 2);
        break;
      case "ArrowRight":
        idx += 1;
        if (idx < options.length && idx !== 2)
          setHoveredOption((prev) => prev + 1);
        break;
      case "ArrowLeft":
        idx -= 1;
        if (idx > -1 && idx !== 1) setHoveredOption((prev) => prev - 1);
        break;
      case "Enter":
        onSelect(options[hoveredOption]);
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
  }, [hoveredOption]);

  return (
    <div className={styles.container}>
      {Array.from({ length: 4 }).map((_, idx) => {
        const el = options[idx] || { name: "-" };
        return (
          <div key={idx} className={styles.option}>
            <div
              className={`${styles.arrow} ${
                hoveredOption === idx ? "" : styles.hidden
              }`}
            >
              &#9658;
            </div>
            <div
              className={styles.text}
              onClick={() => {
                setHoveredOption(idx);
                onSelect(el);
              }}
            >
              {el.name.toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
