import Game from "@components/Game";
import StartMenu from "@components/StartMenu";
import styles from "@styles/Home.module.css";
import { useState } from "react";
import pokemon from "@shared/pokemon.json";
import moves from "@shared/moves.json";

export default function Home() {
  const [team, setTeam] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [mode, setMode] = useState("start");

  function populateMoves(team) {
    const updatedTeam = team.map((pokemon) => {
      const updatedPokemon = { ...pokemon };
      updatedPokemon.moves = updatedPokemon.moves.map((move) => {
        return move.move ? moves[move.move] : move;
      });
      return updatedPokemon;
    });

    return updatedTeam;
  }

  function onGameStart() {
    if (team.length > 0) {
      const newOpponentTeam = [];

      for (let i = 0; i < team.length; i++) {
        const randomIndex = Math.floor(Math.random() * pokemon.length);
        const randomPokemon = {
          ...pokemon[randomIndex],
          level: team[i].level,
          evStats: team[i].evStats,
        };
        newOpponentTeam.push(randomPokemon);
      }
      const userTeamWithMoves = populateMoves(team);
      const opponentTeamWithMoves = populateMoves(newOpponentTeam);

      setTeam(userTeamWithMoves);
      setOpponentTeam(opponentTeamWithMoves);
      setMode("battle");
    }
  }

  return (
    <div className={styles.container}>
      {mode === "start" && (
        <StartMenu team={team} setTeam={setTeam} onGameStart={onGameStart} />
      )}
      {mode === "battle" && (
        <Game
          team={team}
          opponentTeam={opponentTeam}
          onGameEnd={() => setMode("start")}
        />
      )}
    </div>
  );
}
