import { attack, wait } from "@shared/helpers";
import { useEffect, useState } from "react";

export function useBattleSequence(sequence, player, opponent) {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(player.maxHP);
  const [playerMoves, setPlayerMoves] = useState(player.moves);
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentHealth, setOpponentHealth] = useState(opponent.maxHP);
  const [opponentMoves, setOpponentMoves] = useState(opponent.moves);
  const [opponentAnimation, setOpponentAnimation] = useState("static");
  const [announcerMessage, setAnnouncerMessage] = useState("");

  /**
   * Set either the player or opponent animation
   *
   * @param {number} target - The player the animation should apply to. Use 1 for AI Opponent and 0 for the User
   * @param {string} animation - The animation to apply
   */
  function setAnimation(target, animation) {
    turn === target
      ? setPlayerAnimation(animation)
      : setOpponentAnimation(animation);
  }

  /**
   * Set either the player or opponent health
   *
   * @param {number} target - The player the health update should apply to. Use 1 for AI Opponent and 0 for the User
   * @param {string} damage - The amount of damage inflicted
   */
  function setHealth(target, damage) {
    turn === target
      ? setPlayerHealth((health) => (health - damage > 0 ? health - damage : 0))
      : setOpponentHealth((health) =>
          health - damage > 0 ? health - damage : 0
        );
  }

  useEffect(() => {
    const { mode, turn } = sequence;
    if (mode) {
      const attacker = turn === 0 ? player : opponent;
      const receiver = turn === 0 ? opponent : player;
      const { type, move } = mode;
      switch (type) {
        case "fight":
          const damage = attack({ attacker, receiver });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}!`);
            await wait(1000);
            setAnimation(0, "fight");
            await wait(100);
            setAnimation(0, "static");
            await wait(500);
            setAnimation(1, "damage");
            await wait(750);
            setAnimation(1, "static");
            setAnnouncerMessage(`${receiver.name} got hurt!`);
            setHealth(1, damage);
            await wait(2000);
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
