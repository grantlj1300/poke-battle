import { typeEffectiveness } from "./constants";

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Function for handling AI opponent actions.
 *
 * @param {number} turn - The current turn. Use 1 for AI Opponent and 0 for the User
 * @param {number} opponentPokemon - The opponent's pokemon roster
 * @param {number} gameStatus - The status of the game such as "fainted"
 */
export function AIOpponentMove(turn, opponentPokemon, gameStatus) {
  if (turn === 1) {
    if (gameStatus === "fainted") {
      return { type: "pokemon", swapIdx: 1 };
    } else {
      const options = opponentPokemon[0].moves;
      return {
        type: "fight",
        move: options[Math.floor(Math.random() * options.length)],
      };
    }
  }
}

// Using Gen 1 attack calculation
// Gen 2 Critical hit probability
// Gen 1 random multiplier
export function attack({ attacker, receiver, move }) {
  const CRITICAL_HIT_PROB = 0.0625;
  const critHitMultiplier = Math.random() <= CRITICAL_HIT_PROB ? 2 : 1;
  const randomMultiplier = Math.floor(217 + Math.floor(Math.random() * 39));
  const { level } = attacker;
  const { attack } = attacker.stats;
  const { defense } = receiver.stats;
  const { power } = move;
  const sameTypeAttackBonus = move.type === attacker.type ? 1.5 : 1;
  const typeMultiplier = typeEffectiveness[move.type][receiver.type];
  let messages = [];
  if (critHitMultiplier === 2) {
    messages.push("A critical hit!");
  }
  switch (typeMultiplier) {
    case 2:
      messages.push("It's super effective!");
      break;
    case 0.5:
      messages.push("It's not very effective...");
      break;
    case 0:
      messages.push("It had no effect!");
      break;
    default:
      break;
  }
  const damage = Math.floor(
    (((((2 * level * critHitMultiplier) / 5 + 2) * power * (attack / defense)) /
      50 +
      2) *
      sameTypeAttackBonus *
      typeMultiplier *
      randomMultiplier) /
      255
  );
  return { damage, messages };
}
