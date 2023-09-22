import Game from "@components/Game";
import StartMenu from "@components/StartMenu";
import styles from "@styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("start");

  return (
    <div className={styles.container}>
      {mode === "start" && <StartMenu onGameStart={() => setMode("battle")} />}
      {mode === "battle" && <Game onGameEnd={() => setMode("start")} />}
    </div>
  );
}
