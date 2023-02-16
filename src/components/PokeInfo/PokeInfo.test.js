import { PokeInfo } from './PokeInfo';
import { screen, render } from '@testing-library/react';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  abilities: [{ ability: { name: 'overgrow' } }],
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

describe('PokeInfo', () => {
  it('displays pokemon name and id correctly', () => {
    render(<PokeInfo pokemon={mockPokemon} />);

    const pokeName = screen.getByText('Bulbasaur');
    const pokeId = screen.getByText('#1');

    expect(pokeName).toBeInTheDocument();
    expect(pokeId).toBeInTheDocument();
  });

  it('displays abilities and types correctly', () => {
    render(<PokeInfo pokemon={mockPokemon} />);

    const abilityNames = screen.getAllByRole('listitem').slice(0, 1);
    const typeNames = screen.getAllByRole('listitem').slice(1, 3);

    expect(abilityNames[0]).toHaveTextContent('Overgrow');
    expect(typeNames[0]).toHaveTextContent('Grass');
    expect(typeNames[1]).toHaveTextContent('Poison');
  });

  it('displays pokemon images correctly', () => {
    render(<PokeInfo pokemon={mockPokemon} />);

    const frontImage = screen.getByTestId('front-image');
    const backImage = screen.getByTestId('back-image');

    expect(frontImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    expect(backImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png');
  });
});
