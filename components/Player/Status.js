import HealthBar from "@components/HealthBar";
import styles from "@styles/Player/Status.module.css";

export default function Status({ user = false, pokemon }) {
  const { health, name, level } = pokemon;

  return (
    <div className={`${styles.container} ${user ? styles.user : ""}`}>
      <div className={styles.top}>
        <div>{name}</div>
        <div>Lv. {level}</div>
      </div>
      <div className={styles.health}>
        <HealthBar user={user} current={health.current} max={health.max} />
      </div>
    </div>
  );
}
