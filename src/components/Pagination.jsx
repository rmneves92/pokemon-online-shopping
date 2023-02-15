import '../index.css';

const Pagination = ({ limit, offset, total, setOffset }) => {
  const pageCount = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const highestPossibleOffset = limit * (pageCount - 1);
  const pageArray = [-2, -1, 0, 1, 2].map((v) => currentPage + v).filter((page) => page > 0 && page <= pageCount);

  return (
    <div className="pagination">
      {total > 0 && (
        <div>
          <button onClick={() => setOffset(0)}>All left</button>
          <button onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}>Left</button>

          {!pageArray.includes(1) && (
            <>
              <button
                onClick={() => {
                  setOffset(0);
                }}
              >
                1
              </button>
              <button>...</button>
            </>
          )}

          {pageArray.map((page) => {
            return (
              <button
                onClick={() => {
                  setOffset(limit * (page - 1));
                }}
              >
                {page}
              </button>
            );
          })}

          {!pageArray.includes(pageCount) && (
            <>
              <button>...</button>
              <button
                onClick={() => {
                  setOffset(highestPossibleOffset);
                }}
              >
                {pageCount}
              </button>
            </>
          )}

          <button onClick={() => setOffset((prev) => Math.min(prev + limit, highestPossibleOffset))}>Right</button>
          <button onClick={() => setOffset(highestPossibleOffset)}>All right</button>
        </div>
      )}
    </div>
  );
};

export { Pagination };
