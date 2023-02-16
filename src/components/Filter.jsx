import { capitalize } from '../utils/text';
import styles from './Filter.module.css';

const Filter = ({
  query,
  setQuery,
  handleKeyDown,
  handleSearch,
  limitOptions,
  handleChangeLimit,
  selectedAbilities,
  removeAbility,
  handleSelectAbility,
  abilities,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.filters}>
        <div>
          <p className={styles.label}>Search</p>
          <input type="text" name="search" placeholder="Search by id or name..." onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
          <button className={styles.button} onClick={() => handleSearch(query)}>
            Go!
          </button>
        </div>

        <div>
          <p className={styles.label}>Filter by ability</p>

          <select onChange={(e) => handleSelectAbility(e.target.value)}>
            {abilities.map((ability) => (
              <option value={ability.name}>{capitalize(ability.name)}</option>
            ))}
          </select>
        </div>

        <div>
          <p className={styles.label}>Pokémons per page</p>
          <select onChange={(e) => handleChangeLimit(e.target.value)}>
            {limitOptions?.map((opt) => (
              <option value={opt}> {opt}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedAbilities && (
        <ul className={styles.abilities}>
          {selectedAbilities.map((ability) => (
            <li className={styles.item}>
              <span>
                {capitalize(ability)}
                <span className={styles.remove} onClick={() => removeAbility(ability)}>
                  &times;
                </span>
              </span>
            </li>
          ))}
        </ul>
        // </div>
      )}
    </div>
  );
};

export { Filter };
