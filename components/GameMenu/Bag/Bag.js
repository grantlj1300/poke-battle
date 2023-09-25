import styles from "@styles/GameMenu/Bag/Bag.module.css";
import BagOption from "./BagOption";
import { useState } from "react";

export default function Bag({ items, toMainMenu }) {
  const [hoveredOption, setHoveredOption] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <div className={styles.bagCategory}>
          Items
          <div className={styles.line} />
        </div>
        <img
          src="https://archives.bulbagarden.net/media/upload/e/ed/Bag_Potion_Sprite.png"
          className={styles.image}
        />
        <div className={styles.description}>
          Restores the HP of a Pokemon by 20 points.
        </div>
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
              setHoveredOption={setHoveredOption}
            />
          ))}

          <BagOption
            idx={items.length}
            key={items.length}
            name={"Close Bag"}
            hoveredOption={hoveredOption}
            setHoveredOption={setHoveredOption}
            onClick={toMainMenu}
          />
        </div>
      </div>
    </div>
  );
}
