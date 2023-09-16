export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function attack({ attacker, receiver }) {
  const receivedDamage = Math.floor(Math.random() * 10) + 1;

  return receivedDamage;
}
