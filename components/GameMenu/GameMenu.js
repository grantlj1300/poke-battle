import styles from "@styles/GameMenu/GameMenu.module.css";
import QuadSelector from "./QuadSelector";
import TextAnnouncer from "./TextAnnouncer";
import { useState } from "react";
import MoveInfo from "./MoveInfo";

export default function GameMenu({
  displayOptions,
  message,
  moves,
  turn,
  setSequence,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [previewedOption, setPreviewedOption] = useState("");
  const mainMenuOptions = [
    { name: "fight" },
    { name: "bag" },
    { name: "pokemon" },
    { name: "run" },
  ];

  if (selectedOption === "fight") {
    return (
      <div className={styles.container}>
        <div style={{ minWidth: "70%" }}>
          <QuadSelector
            options={moves}
            onSelect={(move) => {
              setSelectedOption("");
              setSequence({ turn, mode: { type: "fight", move } });
            }}
            onBack={() => setSelectedOption("")}
            onHover={(move) => setPreviewedOption(move)}
          />
        </div>
        <MoveInfo move={previewedOption} />
      </div>
    );
  } else if (selectedOption === "bag") {
    return <></>;
  } else if (selectedOption === "pokemon") {
    return <></>;
  } else if (selectedOption === "run") {
    return <></>;
  } else
    return (
      <div className={styles.container}>
        <div style={{ minWidth: "60%", width: "100%" }}>
          <TextAnnouncer message={message} />
        </div>
        {displayOptions && (
          <QuadSelector
            options={mainMenuOptions}
            onSelect={(menuOption) => setSelectedOption(menuOption.name)}
          />
        )}
      </div>
    );
}
