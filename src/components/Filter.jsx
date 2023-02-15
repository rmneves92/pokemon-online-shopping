import { Pagination } from '../components/Pagination';
import '../index.css';

const Filter = ({ query, setQuery, handleKeyDown, handleSearch, total, limit, setLimit, offset, setOffset, from, to, limitOptions, handleChangeLimit }) => {
  return (
    <div className="filter">
      <div>
        <label htmlFor="search">Search</label>
        <input name="search" placeholder="Search by id or name..." onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={() => handleSearch(query)}>Go!</button>
      </div>

      <Pagination total={total} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />

      <div>
        <p>
          Showing {from} to {to} of {total} items
        </p>
        <select onChange={handleChangeLimit}>
          {limitOptions?.map((opt) => (
            <option value={opt}> {opt} per page </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Filter };
