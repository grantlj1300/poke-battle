import useTypedMessage from "@hooks/useTypedMessage";
import styles from "@styles/GameMenu/TextAnnouncer.module.css";

export default function TextAnnouncer({ message }) {
  const typedMessage = useTypedMessage(message);
  return <div className={styles.container}>{typedMessage}</div>;
}
