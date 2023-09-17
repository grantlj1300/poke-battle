import { attack, wait } from "@shared/helpers";
import { useEffect, useState } from "react";

export function useBattleSequence(sequence, player, opponent) {
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(player.maxHP);
  const [playerMoves, setPlayerMoves] = useState(player.moves);
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentHealth, setOpponentHealth] = useState(opponent.maxHP);
  const [opponentMoves, setOpponentMoves] = useState(opponent.moves);
  const [opponentAnimation, setOpponentAnimation] = useState("static");
  const [announcerMessage, setAnnouncerMessage] = useState("");

  function setAnimation(target, animation) {
    turn === target
      ? setPlayerAnimation(animation)
      : setOpponentAnimation(animation);
  }

  function setHealth(target, damage) {
    turn === target
      ? setPlayerHealth((health) => (health - damage > 0 ? health - damage : 0))
      : setOpponentHealth((health) =>
          health - damage > 0 ? health - damage : 0
        );
  }

  function setMoves(target, move) {
    turn === target
      ? setPlayerMoves((prevMoves) =>
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
          )
        )
      : setOpponentMoves((prevMoves) =>
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
          )
        );
  }

  useEffect(() => {
    const { mode, turn } = sequence;
    // Possible race condition, AI moves twice, shouldnt have to check for inSequence
    if (mode && !inSequence) {
      const attacker = turn === 0 ? player : opponent;
      const receiver = turn === 0 ? opponent : player;
      const { type, move } = mode;
      switch (type) {
        case "fight":
          const { damage, messages } = attack({ attacker, receiver, move });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}!`);
            setMoves(turn, move);
            await wait(1000);
            setAnimation(0, "fight");
            await wait(100);
            setAnimation(0, "static");
            await wait(500);
            setAnimation(1, "damage");
            await wait(750);
            setAnimation(1, "static");
            setHealth(1, damage);
            for (const message of messages) {
              setAnnouncerMessage(message);
              await wait(2000);
            }
            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);
            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    gameStatus,
    inSequence,
    playerHealth,
    playerMoves,
    playerAnimation,
    opponentHealth,
    opponentMoves,
    opponentAnimation,
    announcerMessage,
  };
}
