import '../index.css';
import { capitalizeFirstLetter } from '../utils/text';

const PokeInfo = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <p>{pokemon?.id}</p>
        <img className="pokemon-image" src={pokemon?.sprites.front_default} />
        <p className="pokemon-name">{capitalizeFirstLetter(pokemon?.name)}</p>
      </div>
    </div>
  );
};

export { PokeInfo };
