import { capitalize } from '../utils/text';
import styles from './Card.module.css';

const Card = ({ pokemon, showPokemonDetails }) => (
  <div key={pokemon.name} className={styles.card} onClick={() => showPokemonDetails(pokemon.name)}>
    <div className={styles.details}>
      <p>{pokemon.id}</p>
      <img className={styles.image} alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
      <p>{capitalize(pokemon.name)}</p>
    </div>
  </div>
);

export { Card };
