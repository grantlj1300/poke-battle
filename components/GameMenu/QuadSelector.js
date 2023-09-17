import { useEffect, useState } from "react";
import styles from "@styles/GameMenu/QuadSelector.module.css";

export default function QuadSelector({
  options,
  onSelect,
  onBack = () => {},
  onHover = () => {},
}) {
  const [hoveredOption, setHoveredOption] = useState(0);
  useEffect(() => {
    setHoveredOption(0);
    onHover(options[0]);
  }, [options]);

  function handleKeyDown(e) {
    let idx = hoveredOption;
    switch (e.key) {
      case "ArrowUp":
        idx -= 2;
        if (idx > -1) {
          setHoveredOption(idx);
          onHover(options[idx]);
        }
        break;
      case "ArrowDown":
        idx += 2;
        if (idx < options.length) {
          setHoveredOption(idx);
          onHover(options[idx]);
        }
        break;
      case "ArrowRight":
        idx += 1;
        if (idx < options.length && idx !== 2) {
          setHoveredOption(idx);
          onHover(options[idx]);
        }
        break;
      case "ArrowLeft":
        idx -= 1;
        if (idx > -1 && idx !== 1) {
          setHoveredOption(idx);
          onHover(options[idx]);
        }
        break;
      case "Enter":
        onSelect(options[hoveredOption]);
        break;
      case "Delete":
      case "Backspace":
        onBack();
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
        const valid = options[idx] ? true : false;
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
              style={{ cursor: valid ? "pointer" : "default" }}
              onClick={() => {
                if (valid) {
                  setHoveredOption(idx);
                  onSelect(el);
                }
              }}
              onMouseOver={() => {
                if (valid) {
                  setHoveredOption(idx);
                  onHover(el);
                }
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
