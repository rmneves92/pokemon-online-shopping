import { capitalize } from '../utils/text';

const Card = ({ pokemon, showPokemonDetails }) => (
  <div key={pokemon.name} className="pokemon-card" onClick={() => showPokemonDetails(pokemon.name)}>
    <div className="pokemon-details">
      <p>{pokemon.id}</p>
      <img className="pokemon-image" alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
      <p className="pokemon-name">{capitalize(pokemon.name)}</p>
    </div>
  </div>
);

export { Card };
