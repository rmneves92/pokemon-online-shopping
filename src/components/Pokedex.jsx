import { Card } from '../components/Card';

const Pokedex = ({ pokeInfo, pokemons, showPokemonDetails, setPokeInfo }) => {
  return (
    <div className="catalog">
      {!pokeInfo && pokemons ? (
        pokemons?.map((pokemon) => <Card pokemon={pokemon} showPokemonDetails={showPokemonDetails} />)
      ) : (
        <a className="back-button" onClick={() => setPokeInfo(null)}>
          &larr; back
        </a>
      )}
    </div>
  );
};

export { Pokedex };
