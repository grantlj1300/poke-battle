import styles from "@styles/GameMenu/PokemonSelector/PokemonCard.module.css";

export default function PokemonCard({ pokemon }) {
  if (pokemon === null) {
    return <div>Empty Pokemon</div>;
  }
  return <div>Pokemon</div>;
}
