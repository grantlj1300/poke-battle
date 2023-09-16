import styles from "@styles/GameMenu/MoveInfo.module.css";

export default function MoveInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.ppRow}>
        <div>PP</div>
        <div>16/16</div>
      </div>
      <div className={styles.typeRow}>Type/Ground</div>
    </div>
  );
}
