import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const limit = 10;
  const offset = 0;
  const total = 100;
  const setOffset = jest.fn();

  it('should render the pagination component with correct page numbers', () => {
    render(<Pagination limit={limit} offset={offset} total={total} setOffset={setOffset} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1')).toHaveClass('active');

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should call setOffset with correct value when a page number is clicked', () => {
    render(<Pagination limit={limit} offset={offset} total={total} setOffset={setOffset} />);

    const pageTwoButton = screen.getByText('2');
    userEvent.click(pageTwoButton);

    expect(setOffset).toHaveBeenCalledWith(10);
  });
});
