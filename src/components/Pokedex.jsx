import { Card } from '../components/Card';
import styles from './Pokedex.module.css';

const Pokedex = ({ pokeInfo, pokemons, showPokemonDetails, setPokeInfo }) => {
  return (
    <div className={styles.pokedex}>
      {!pokeInfo && pokemons ? (
        pokemons?.map((pokemon) => <Card pokemon={pokemon} showPokemonDetails={showPokemonDetails} />)
      ) : (
        <a className={styles.back} onClick={() => setPokeInfo(null)}>
          &larr; Pokédex
        </a>
      )}
    </div>
  );
};

export { Pokedex };
