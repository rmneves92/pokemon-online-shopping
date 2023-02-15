import '../index.css';
import { capitalizeFirstLetter } from '../utils/text';

const PokeInfo = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className="pokemon-card-details ">
      <div className="pokemon-details">
        <p>{pokemon?.id}</p>
        <img className="pokemon-image" src={pokemon?.sprites.front_default} />
        <p className="pokemon-name">{capitalizeFirstLetter(pokemon?.name)}</p>
      </div>

      <div>
        <p>Abilities:</p>
        <ul>
          {pokemon.abilities.map(({ ability }) => {
            return <li>{ability.name}</li>;
          })}
        </ul>
      </div>

      <div>
        <p>Types:</p>
        <ul>
          {pokemon.types.map(({ type }) => {
            return <li>{type.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export { PokeInfo };
