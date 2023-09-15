import styles from "../../styles/GameMenu/GameMenu.module.css";
import MenuOptions from "./MenuOptions";

export default function GameMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.bottomMenu}>What will Charmander do?</div>
      <MenuOptions />
    </div>
  );
}
