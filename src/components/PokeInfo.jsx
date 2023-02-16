import { capitalize } from '../utils/text';
import styles from './PokeInfo.module.css';

const PokeInfo = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <p className={styles.pokemon_name}>
          {capitalize(pokemon.name)} <span className={styles.pokemon_id}>#{pokemon.id}</span>
        </p>
        <div className={styles.gallery}>
          <img className={styles.pokemon_img} alt={pokemon.name} src={pokemon.sprites.front_default} />
          <img className={styles.pokemon_img_back} alt={pokemon.name} src={pokemon.sprites.back_default} />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.ability_card}>
          <p className={styles.title}>Ability:</p>
          <ul>
            {pokemon.abilities.map(({ ability }) => {
              return <li className={styles.attr_name}>{capitalize(ability.name)}</li>;
            })}
          </ul>
        </div>

        <div className={styles.type_card}>
          <p className={styles.title}>Type:</p>
          <ul>
            {pokemon.types.map(({ type }) => {
              return <li className={styles.attr_name}>{capitalize(type.name)}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { PokeInfo };
