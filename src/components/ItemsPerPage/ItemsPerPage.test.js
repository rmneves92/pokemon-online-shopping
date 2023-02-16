import { ItemsPerPage } from './ItemsPerPage';
import { render, screen } from '@testing-library/react';

describe('ItemsPerPage', () => {
  it('displays the correct range of items', () => {
    const limit = 10;
    const offset = 20;
    const total = 100;

    render(<ItemsPerPage limit={limit} offset={offset} total={total} />);

    const from = Math.min(offset + 1, total);
    const to = Math.min(offset + limit, total);

    expect(screen.getByText(`Showing ${from} to ${to} of ${total} Pokémons`)).toBeInTheDocument();
  });

  it('displays the correct range when offset is greater than total', () => {
    const limit = 10;
    const offset = 110;
    const total = 100;

    render(<ItemsPerPage limit={limit} offset={offset} total={total} />);

    const from = Math.min(offset + 1, total);
    const to = Math.min(offset + limit, total);

    expect(screen.getByText(`Showing ${from} to ${to} of ${total} Pokémons`)).toBeInTheDocument();
  });
});
