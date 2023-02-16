import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

const mock = {
  name: 'bulbasaur',
  id: 1,
};

describe('Card component', () => {
  it('renders the pokemon name and image', () => {
    render(<Card pokemon={mock} showPokemonDetails={() => {}} />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeImg = screen.getByAltText('bulbasaur');

    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Bulbasaur');
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('when the component is clicked call the showPokemonDetails function', () => {
    const mockShowPokemonDetails = jest.fn();
    render(<Card pokemon={mock} showPokemonDetails={mockShowPokemonDetails} />);

    const card = screen.getByTestId('pokemon-card');
    userEvent.click(card);

    expect(mockShowPokemonDetails).toHaveBeenCalledWith('bulbasaur');
  });
});
