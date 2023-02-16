import styles from './ItemsPerPage.module.css';

const ItemsPerPage = ({ limit, offset, total }) => {
  const from = Math.min(offset + 1, total);
  const to = Math.min(offset + limit, total);

  return (
    <p data-testid="items-per-page" className={styles.total_items}>
      Showing {from} to {to} of {total} Pokémons
    </p>
  );
};

export { ItemsPerPage };
