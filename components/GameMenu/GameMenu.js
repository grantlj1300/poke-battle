import styles from "@styles/GameMenu/GameMenu.module.css";
import MenuOptions from "./MenuOptions";
import TextAnnouncer from "./TextAnnouncer";

export default function GameMenu({ displayOptions, message, ...rest }) {
  return (
    <div className={styles.container}>
      <TextAnnouncer message={message} />
      {displayOptions && <MenuOptions {...rest} />}
    </div>
  );
}
