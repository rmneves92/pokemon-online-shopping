import { capitalize } from '../../utils/text';
import styles from './PokeInfo.module.css';

const PokeInfo = ({ pokemon }) => {
  return (
    <div className={styles.card} data-testid="pokeinfo">
      <div className={styles.details}>
        <p className={styles.pokemon_name}>
          {capitalize(pokemon.name)} <span className={styles.pokemon_id}>#{pokemon.id}</span>
        </p>
        <div className={styles.gallery}>
          <img data-testid="front-image" className={styles.pokemon_img} alt={pokemon.name} src={pokemon.sprites?.front_default} />
          <img data-testid="back-image" className={styles.pokemon_img_back} alt={pokemon.name} src={pokemon.sprites?.back_default} />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.ability_card}>
          <p className={styles.title}>Ability:</p>
          <ul>
            {pokemon.abilities?.map(({ ability }) => {
              return (
                <li key={ability.name} className={styles.attr_name}>
                  {capitalize(ability.name)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.type_card}>
          <p className={styles.title}>Type:</p>
          <ul>
            {pokemon.types?.map(({ type }) => {
              return (
                <li key={type.name} className={styles.attr_name}>
                  {capitalize(type.name)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { PokeInfo };
