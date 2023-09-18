import styles from "@styles/CancelButton.module.css";
export default function CancelButton({ onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      CANCEL
    </div>
  );
}
