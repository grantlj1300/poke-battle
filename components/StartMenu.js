import styles from "@styles/StartMenu.module.css";

export default function StartMenu({ onGameStart }) {
  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={onGameStart}>
        Start
      </div>
    </div>
  );
}
