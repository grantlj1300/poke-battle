import styles from "../../styles/GameMenu/MenuOptions.module.css";
export default function MenuOptions() {
  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <div className={styles.button}>Fight</div>
        <div className={styles.button}>Pokemon</div>
      </div>
      <div className={styles.col}>
        <div className={styles.button}>Bag</div>
        <div className={styles.button}>Run</div>
      </div>
    </div>
  );
}
