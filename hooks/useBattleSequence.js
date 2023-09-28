import { attack, wait } from "@shared/helpers";
import { useEffect, useState } from "react";

export function useBattleSequence(
  sequence,
  player,
  playerItemsBase,
  opponent,
  opponentItemsBase
) {
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [inSequence, setInSequence] = useState(false);
  const [playerPokemon, setPlayerPokemon] = useState(initializePokemon(player));
  const [playerItems, setPlayerItems] = useState(
    initializeItems(playerItemsBase)
  );
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentPokemon, setOpponentPokemon] = useState(
    initializePokemon(opponent)
  );
  const [opponentItems, setOpponentItems] = useState(
    initializeItems(opponentItemsBase)
  );
  const [opponentAnimation, setOpponentAnimation] = useState("static");
  const [announcerMessage, setAnnouncerMessage] = useState("");

  function initializePokemon(pokemon) {
    return pokemon.map((poke) => {
      const health =
        Math.floor(
          0.01 *
            (2 * poke.baseStats.hp +
              Math.floor(Math.random() * 32) * poke.level)
        ) +
        poke.level +
        10;
      const attack =
        Math.floor(
          0.01 *
            (2 * poke.baseStats.attack + Math.floor(Math.random() * 32)) *
            poke.level
        ) + 5;
      const defense =
        Math.floor(
          0.01 *
            (2 * poke.baseStats.defense + Math.floor(Math.random() * 32)) *
            poke.level
        ) + 5;
      return {
        ...poke,
        moves: poke.moves.map((move) => ({
          ...move,
          pp: { ...move.pp, current: move.pp.max },
        })),
        stats: {
          hp: { current: health, max: health },
          attack,
          defense,
        },
      };
    });
  }

  function initializeItems(items) {
    return items.map((item) => ({
      ...item,
      count: 1,
    }));
  }

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
      newHealth = updateHealth(playerPokemon[0].stats.hp.current);
      setPlayerPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].stats.hp.current = newHealth;
        return updatedPokemon;
      });
    } else {
      newHealth = updateHealth(opponentPokemon[0].stats.hp.current);
      setOpponentPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon];
        updatedPokemon[0].stats.hp.current = newHealth;
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
                current: prevMove.pp.current - 1,
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
              const allFainted =
                turn === 0
                  ? opponentPokemon.every((poke) => poke.stats.hp.current === 0)
                  : playerPokemon.every((poke) => poke.stats.hp.current === 0);
              if (allFainted) {
                if (turn === 0) {
                  setAnnouncerMessage("You defeated your opponent!");
                  await wait(2000);
                  setGameStatus("win");
                } else {
                  setAnnouncerMessage("You are out of usable Pokemon!");
                  await wait(2000);
                  setAnnouncerMessage("You whited out!");
                  await wait(2000);
                  setGameStatus("lose");
                }
                return;
              }
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
        case "bag":
          const { pokeIdx } = mode;
          (async () => {
            setInSequence(true);
            setPlayerPokemon((prev) => {
              const pokemon = [...prev];
              const { current, max } = pokemon[pokeIdx].stats.hp;
              pokemon[pokeIdx].stats.hp.current =
                current + 20 > max ? max : current + 20;
              return pokemon;
            });
            setTurn(1);
            await wait(350);
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
    playerItems,
    playerAnimation,
    opponentPokemon,
    opponentItems,
    opponentAnimation,
    announcerMessage,
  };
}
