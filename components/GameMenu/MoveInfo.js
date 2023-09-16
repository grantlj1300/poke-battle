import styles from "@styles/GameMenu/MoveInfo.module.css";

export default function MoveInfo({ move }) {
  return (
    <div className={styles.container}>
      <div className={styles.ppRow}>
        <div>PP</div>
        <div>
          {move.pp}/{move.pp}
        </div>
      </div>
      <div className={styles.typeRow}>TYPE/{move.type?.toUpperCase()}</div>
    </div>
  );
}
