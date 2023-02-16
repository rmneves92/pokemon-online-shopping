import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from './Pokedex';

describe('Pokedex', () => {
  const pokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Pikachu' },
    { id: 3, name: 'Squirtle' },
  ];

  it('should render a list of pokemons if pokeInfo is falsy', () => {
    render(<Pokedex pokemons={pokemons} />);

    const pokemonCards = screen.queryAllByTestId('pokemon-name');

    expect(pokemonCards).toHaveLength(3);
    expect(pokemonCards[0]).toHaveTextContent('Bulbasaur');
    expect(pokemonCards[1]).toHaveTextContent('Pikachu');
    expect(pokemonCards[2]).toHaveTextContent('Squirtle');
  });

  it('should call showPokemonDetails when a pokemon card is clicked', () => {
    const showPokemonDetails = jest.fn();

    render(<Pokedex pokemons={pokemons} showPokemonDetails={showPokemonDetails} />);
    const pokemonCard = screen.getAllByText(/bulbasaur/i);
    userEvent.click(pokemonCard[0]);

    expect(showPokemonDetails).toHaveBeenCalledTimes(1);
    expect(showPokemonDetails).toHaveBeenCalledWith(pokemons[0].name);
  });

  it('should render a back button if pokeInfo is truthy', () => {
    render(<Pokedex pokeInfo={{ name: 'Bulbasaur' }} setPokeInfo={() => {}} />);
    const backButton = screen.getByText(/Pokédex/);

    expect(backButton).toBeInTheDocument();
  });
});
