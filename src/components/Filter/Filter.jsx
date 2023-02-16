import { capitalize } from '../../utils/text';
import styles from './Filter.module.css';

const Filter = ({
  searchQuery,
  setSearchQuery,
  handleKeyDown,
  handleSearch,
  handleChangeLimit,
  selectedAbilities,
  removeAbility,
  handleSelectAbility,
  abilities,
}) => {
  const limitOptions = [10, 20, 30, 40, 50];

  return (
    <div className={styles.panel} data-testid="filter">
      <div className={styles.filters}>
        <div>
          <p className={styles.label}>Search</p>
          <input
            type="text"
            name="search"
            placeholder="Search by id or name..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            data-testid="search-input"
          />
          <button className={styles.button} onClick={() => handleSearch(searchQuery)} data-testid="search-btn">
            Go!
          </button>
        </div>

        <div>
          <p className={styles.label}>Filter by ability</p>

          <select data-testid="combo-ability" onChange={(e) => handleSelectAbility(e.target.value)}>
            {abilities?.map((ability) => (
              <option data-testid="ability-opt" key={ability.name} value={ability.name}>
                {capitalize(ability.name)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className={styles.label}>Pokémons per page</p>
          <select data-testid="limit-items" onChange={(e) => handleChangeLimit(e.target.value)}>
            {limitOptions?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedAbilities && (
        <ul className={styles.abilities} data-testid="abilities-list">
          {selectedAbilities?.map((ability) => (
            <li key={ability} className={styles.item}>
              <span>
                {capitalize(ability)}
                <span className={styles.remove} onClick={() => removeAbility(ability)}>
                  &times;
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Filter };
