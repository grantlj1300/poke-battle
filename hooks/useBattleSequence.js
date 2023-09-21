import { attack, wait } from "@shared/helpers";
import { useEffect, useState } from "react";

export function useBattleSequence(sequence, player, opponent) {
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [inSequence, setInSequence] = useState(false);
  const [playerPokemon, setPlayerPokemon] = useState(player);
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentPokemon, setOpponentPokemon] = useState(opponent);
  const [opponentAnimation, setOpponentAnimation] = useState("static");
  const [announcerMessage, setAnnouncerMessage] = useState("");

  function setAnimation(target, animation) {
    turn === target
      ? setPlayerAnimation(animation)
      : setOpponentAnimation(animation);
  }

  function setHealth(target, damage) {
    const updateHealth = (prevHealth) =>
      prevHealth - damage > 0 ? prevHealth - damage : 0;
    let newHealth;
    if (target === turn) {
      newHealth = updateHealth(
        playerPokemon[0].health ?? playerPokemon[0].maxHP
      );
      setPlayerPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].health = newHealth;
        return updatedPokemon;
      });
    } else {
      newHealth = updateHealth(
        opponentPokemon[0].health ?? opponentPokemon[0].maxHP
      );
      setOpponentPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].health = newHealth;
        return updatedPokemon;
      });
    }
    return newHealth;
  }

  function setMoves(target, move) {
    const updateMoves = (prevMoves) =>
      prevMoves.map((prevMove) =>
        prevMove.name === move.name
          ? {
              ...prevMove,
              pp: {
                ...prevMove.pp,
                current: prevMove.pp.current
                  ? prevMove.pp.current - 1
                  : prevMove.pp.max - 1,
              },
            }
          : prevMove
      );

    if (target === turn) {
      setPlayerPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].moves = updateMoves(updatedPokemon[0].moves);
        return updatedPokemon;
      });
    } else {
      setOpponentPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].moves = updateMoves(updatedPokemon[0].moves);
        return updatedPokemon;
      });
    }
  }

  function swapPokemon(target, swapIdx) {
    if (target === turn) {
      setPlayerPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        const temp = updatedPokemon[0];
        updatedPokemon[0] = updatedPokemon[swapIdx];
        updatedPokemon[swapIdx] = temp;
        return updatedPokemon;
      });
    } else {
      setOpponentPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        const temp = updatedPokemon[0];
        updatedPokemon[0] = updatedPokemon[swapIdx];
        updatedPokemon[swapIdx] = temp;
        return updatedPokemon;
      });
    }
  }

  useEffect(() => {
    const { mode, turn } = sequence;
    // Possible race condition, AI moves twice, shouldnt have to check for inSequence
    if (mode) {
      const attacker = turn === 0 ? playerPokemon[0] : opponentPokemon[0];
      const receiver = turn === 0 ? opponentPokemon[0] : playerPokemon[0];
      const { type } = mode;
      switch (type) {
        case "fight":
          const { move } = mode;
          const { damage, messages } = attack({ attacker, receiver, move });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `${(turn === 1 ? "Foe " : "") + attacker.name} used ${move.name}!`
            );
            setMoves(0, move);
            await wait(1000);
            setAnimation(0, "fight");
            await wait(100);
            setAnimation(0, "static");
            await wait(500);
            setAnimation(1, "damage");
            await wait(750);
            setAnimation(1, "static");
            const newHealth = setHealth(1, damage);
            for (const message of messages) {
              setAnnouncerMessage(message);
              await wait(2000);
            }
            if (newHealth === 0) {
              setAnimation(1, "sendBack");
              setAnnouncerMessage(
                `${(turn === 0 ? "Foe " : "") + receiver.name} fainted!`
              );
              await wait(2000);
              setGameStatus("fainted");
              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
              return;
            }
            if (turn === 1) {
              setAnnouncerMessage("");
            }
            await wait(1000);
            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        case "pokemon":
          const { swapIdx } = mode;
          (async () => {
            setInSequence(true);
            if (gameStatus === "fainted") {
              setGameStatus("playing");
              setAnnouncerMessage(
                turn === 0
                  ? `Go get 'em, ${playerPokemon[swapIdx].name}!`
                  : `Opponent sent out ${opponentPokemon[swapIdx].name}!`
              );
              setAnimation(0, "sendOut");
              swapPokemon(0, swapIdx);
              await wait(1000);
              setAnimation(0, "static");
              await wait(1000);
              setAnnouncerMessage("");
              setTurn(0);
            } else {
              setAnnouncerMessage(`Good work, ${attacker.name}! Come on back!`);
              await wait(1000);
              setAnimation(0, "sendBack");
              await wait(1000);
              setAnnouncerMessage(
                `Go get 'em, ${playerPokemon[swapIdx].name}!`
              );
              setAnimation(0, "sendOut");
              swapPokemon(0, swapIdx);
              await wait(1000);
              setAnimation(0, "static");
              await wait(1000);
              setAnnouncerMessage("");
              setTurn(turn === 0 ? 1 : 0);
            }
            setInSequence(false);
          })();
          break;
        default:
          break;
      }
    }
  }, [sequence]);

  return {
    gameStatus,
    turn,
    inSequence,
    playerPokemon,
    playerAnimation,
    opponentPokemon,
    opponentAnimation,
    announcerMessage,
  };
}
