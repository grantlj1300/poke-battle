import styles from "@styles/GameMenu/GameMenu.module.css";
import MenuOptions from "./MenuOptions";
import TextAnnouncer from "./TextAnnouncer";

export default function GameMenu() {
  return (
    <div className={styles.container}>
      <TextAnnouncer message={`What will Charmander do?`} />
      <MenuOptions />
    </div>
  );
}
