import { Card } from '../Card/Card';
import styles from './Pokedex.module.css';

const Pokedex = ({ pokeInfo, pokemons, showPokemonDetails, setPokeInfo }) => {
  return (
    <div data-testid="pokedex" className={styles.pokedex}>
      {!pokeInfo && pokemons ? (
        pokemons?.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} showPokemonDetails={showPokemonDetails} />)
      ) : (
        <a className={styles.back} onClick={() => setPokeInfo(null)}>
          &larr; Pokédex
        </a>
      )}
    </div>
  );
};

export { Pokedex };
