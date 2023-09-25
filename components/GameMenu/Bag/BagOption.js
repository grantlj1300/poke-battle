import styles from "@styles/GameMenu/Bag/BagOption.module.css";

export default function BagOption({
  idx,
  name,
  count,
  hoveredOption,
  setHoveredOption,
  onClick,
}) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.arrow} ${
          hoveredOption === idx ? "" : styles.hidden
        }`}
      >
        &#9658;
      </div>
      <div
        className={styles.option}
        onMouseOver={() => setHoveredOption(idx)}
        onClick={onClick}
      >
        <div>{name}</div>
        {count && <div>x {count}</div>}
      </div>
    </div>
  );
}
