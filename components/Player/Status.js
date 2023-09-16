import styles from "@styles/Player/Status.module.css";

export default function Status({ user = false, pokemon }) {
  const { hp, name, level } = pokemon;
  return (
    <div className={`${styles.container} ${user ? styles.user : ""}`}>
      <div className={styles.top}>
        <div>{name}</div>
        <div>Lv. {level}</div>
      </div>
      <div className={styles.bottom}>
        <div>HP</div>
        <progress
          className={styles.healthBar}
          value={hp.current}
          max={hp.max}
        />
      </div>
      {user && (
        <div className={styles.hpValue}>{hp.current + "/" + hp.max}</div>
      )}
    </div>
  );
}
