import styles from "@styles/GameMenu/Bag/Bag.module.css";
import BagOption from "./BagOption";
import { useState } from "react";

export default function Bag({ items, toMainMenu }) {
  const [hoveredOption, setHoveredOption] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredSelectedOption, setHoveredSelectedOption] = useState("use");

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <div className={styles.bagCategory}>
          Items
          <div className={styles.line} />
        </div>
        {hoveredOption !== items.length && (
          <>
            <img src={items[hoveredOption].img} className={styles.image} />
            <div className={styles.description}>
              {selectedOption !== null
                ? items[selectedOption].name + " is selected"
                : items[hoveredOption].description}
            </div>
          </>
        )}
      </div>
      <div className={styles.bag}>
        <div className={styles.bagOptions}>
          {items.map((item, idx) => (
            <BagOption
              idx={idx}
              key={idx}
              name={item.name}
              count={item.count}
              hoveredOption={hoveredOption}
              setHoveredOption={
                selectedOption === null ? setHoveredOption : () => {}
              }
              onClick={() => setSelectedOption(idx)}
            />
          ))}
          <BagOption
            idx={items.length}
            key={items.length}
            name={"Close Bag"}
            hoveredOption={hoveredOption}
            setHoveredOption={
              selectedOption === null ? setHoveredOption : () => {}
            }
            onClick={toMainMenu}
          />
        </div>
        {selectedOption !== null && (
          <div className={styles.selectedOptions}>
            <div
              className={styles.selectedOption}
              onClick={() => {}}
              onMouseOver={() => setHoveredSelectedOption("use")}
            >
              <div
                className={`${styles.arrow} ${
                  hoveredSelectedOption === "use" ? "" : styles.hidden
                }`}
              >
                &#9658;
              </div>
              Use
            </div>
            <div
              className={styles.selectedOption}
              onClick={() => setSelectedOption(null)}
              onMouseOver={() => setHoveredSelectedOption("cancel")}
            >
              <div
                className={`${styles.arrow} ${
                  hoveredSelectedOption === "cancel" ? "" : styles.hidden
                }`}
              >
                &#9658;
              </div>
              Cancel
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
