import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render Home screen', () => {
    render(<Home />);
  });

  it('should render the Pokédex component', () => {
    render(<Home />);
    expect(screen.getByTestId('pokedex')).toBeInTheDocument();
  });

  it('should render the Pagination component', () => {
    render(<Home />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render the Filter component', () => {
    render(<Home />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('should render the ItemsPerPage component', () => {
    render(<Home />);
    expect(screen.getByTestId('items-per-page')).toBeInTheDocument();
  });

  it('should fetch the list of pokemons', async () => {
    fetch.mockResponse(
      JSON.stringify({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
      })
    );
    render(<Home />);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');

    await waitFor(() => {
      expect(screen.getAllByText(/bulbasaur/i)[0]).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByText(/charmander/i)[0]).toBeInTheDocument();
    });
  });

  it('should get the list of abilities', async () => {
    fetch.mockResponse(
      JSON.stringify({
        results: [
          {
            name: 'stench',
            url: 'https://pokeapi.co/api/v2/ability/1/',
          },
          {
            name: 'drizzle',
            url: 'https://pokeapi.co/api/v2/ability/2/',
          },
          {
            name: 'speed-boost',
            url: 'https://pokeapi.co/api/v2/ability/3/',
          },
        ],
      })
    );
    render(<Home />);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability/?limit=100');

    await waitFor(() => {
      expect(screen.queryAllByTestId('ability-opt')).toHaveLength(3);
    });
  });

  it('should show an empty message when no pokemon is found', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    render(<Home />);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'foobar');
    userEvent.type(searchInput, '{enter}');

    await waitFor(() => {
      expect(screen.getByText(/no pokémons found/i)).toBeInTheDocument();
    });
  });

  it('should show an error message when the API is not available', async () => {
    fetch.mockRejectedValue(JSON.stringify({}));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/the api is currently unavailable, please try again later/i)).toBeInTheDocument();
    });
  });

  it('should request pokemon info when clicking on a pokemon card', async () => {
    fetch.mockResponse(
      JSON.stringify({
        results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      })
    );
    render(<Home />);

    let card;
    await waitFor(() => {
      card = screen.getByTestId('pokemon-card');
    });

    userEvent.click(card);

    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
  });
});
