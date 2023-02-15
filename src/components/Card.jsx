import { capitalizeFirstLetter } from '../utils/text';

const Card = ({ pokemon, showPokemonDetails }) => (
  <div key={pokemon.name} className="pokemon-card" onClick={() => showPokemonDetails(pokemon.name)}>
    <div className="pokemon-details">
      <p>{pokemon.id}</p>
      <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
      <p className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</p>
    </div>
  </div>
);

export { Card };
