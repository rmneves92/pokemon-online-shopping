import styles from './Pagination.module.css';

const Pagination = ({ limit, offset, total, setOffset }) => {
  const pageCount = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const highestPossibleOffset = limit * (pageCount - 1);
  const pageArray = [-2, -1, 0, 1, 2].map((v) => currentPage + v).filter((page) => page > 0 && page <= pageCount);

  return (
    <nav className={styles.pagination} data-testid="pagination">
      {total > 0 && (
        <ul className={styles.numbers}>
          <li onClick={() => setOffset(0)}>&laquo;</li>
          <li onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}>Prev</li>

          <div className={styles.page_numbers}>
            {!pageArray.includes(1) && (
              <>
                <li
                  onClick={() => {
                    setOffset(0);
                  }}
                >
                  1
                </li>
                <li>...</li>
              </>
            )}

            {pageArray.map((page) => {
              return (
                <li
                  key={page}
                  className={currentPage === page ? styles.active : null}
                  onClick={() => {
                    setOffset(limit * (page - 1));
                  }}
                >
                  {page}
                </li>
              );
            })}

            {!pageArray.includes(pageCount) && (
              <>
                <li>...</li>
                <li
                  onClick={() => {
                    setOffset(highestPossibleOffset);
                  }}
                >
                  {pageCount}
                </li>
              </>
            )}
          </div>

          <li onClick={() => setOffset((prev) => Math.min(prev + limit, highestPossibleOffset))}>Next</li>
          <li onClick={() => setOffset(highestPossibleOffset)}>&#187;</li>
        </ul>
      )}
    </nav>
  );
};

export { Pagination };
