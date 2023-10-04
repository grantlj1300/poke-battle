import styles from "@styles/StartMenu.module.css";
import TeamBuilder from "./TeamBuilder/TeamBuilder";

export default function StartMenu({ team, setTeam, onGameStart }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Build your team</div>
      <div>Select up to 6 Pokemon for your battle roster</div>
      <TeamBuilder team={team} setTeam={setTeam} onGameStart={onGameStart} />
    </div>
  );
}
