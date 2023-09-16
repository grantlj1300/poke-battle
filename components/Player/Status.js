import styles from "@styles/Player/Status.module.css";

export default function Status({ user = false, pokemon, health }) {
  const { maxHP, name, level } = pokemon;
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
            style={{ width: `${(health / maxHP) * 100}%` }}
          />
        </div>
      </div>
      {user && <div className={styles.hpValue}>{health + "/" + maxHP}</div>}
    </div>
  );
}
