import styles from "@styles/Player/Status.module.css";

export default function Status({ user = false, pokemon, health }) {
  const { maxHP, name, level } = pokemon;
  const hpPercentage = health / maxHP;
  return (
    <div className={`${styles.container} ${user ? styles.user : ""}`}>
      <div className={styles.top}>
        <div>{name}</div>
        <div>Lv. {level}</div>
      </div>
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
      {user && <div className={styles.hpValue}>{health + "/" + maxHP}</div>}
    </div>
  );
}
