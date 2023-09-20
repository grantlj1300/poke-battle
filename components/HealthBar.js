import styles from "@styles/HealthBar.module.css";

export default function HealthBar({ user = false, current, max }) {
  const hpPercentage = current / max;
  return (
    <div className={styles.container}>
      <div className={styles.health}>
        <div>HP</div>
        <div className={styles.maxHealth}>
          <div
            className={styles.currentHealth}
            style={{
              width: `${hpPercentage * 100}%`,
              backgroundColor:
                hpPercentage < 0.2
                  ? "rgb(200, 0, 0)"
                  : hpPercentage < 0.5
                  ? "rgb(200, 200, 0)"
                  : "rgb(0, 200, 0)",
            }}
          />
        </div>
      </div>
      {user && <div className={styles.hpValue}>{current + "/" + max}</div>}
    </div>
  );
}
