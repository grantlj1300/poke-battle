import { typeEffectiveness } from "./constants";

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Using Gen 1 attack calculation
// Gen 2 Critical hit probability
// Gen 1 random multiplier
export function attack({ attacker, receiver, move }) {
  const CRITICAL_HIT_PROB = 0.0625;
  const critHitMultiplier = Math.random() <= CRITICAL_HIT_PROB ? 2 : 1;
  const randomMultiplier = Math.floor(217 + Math.floor(Math.random() * 39));
  const { level, attack } = attacker;
  const { defense } = receiver;
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
