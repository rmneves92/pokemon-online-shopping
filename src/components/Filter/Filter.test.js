import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';

describe('Filter', () => {
  const abilities = [{ name: 'static' }, { name: 'battle-armor' }, { name: 'pressure' }];

  it('should render a search input and submit button', () => {
    render(<Filter />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const goButton = screen.getByTestId('search-btn');
    expect(goButton).toBeInTheDocument();
  });

  it('should render a select input to filter pokemons by ability', () => {
    render(<Filter abilities={abilities} />);
    const abilitySelect = screen.getByTestId('combo-ability');
    expect(abilitySelect).toBeInTheDocument();
  });

  it('should render a select input to set the number of pokemons per page', () => {
    render(<Filter />);

    const limitSelect = screen.getByTestId('limit-items');
    expect(limitSelect).toBeInTheDocument();
  });

  it('should render a list of selected abilities', () => {
    const selectedAbilities = ['static', 'battle-armor'];
    render(<Filter selectedAbilities={selectedAbilities} />);
    const abilityList = screen.getByTestId('abilities-list');
    expect(abilityList).toBeInTheDocument();

    const abilityItems = screen.getAllByRole('listitem');

    expect(abilityItems).toHaveLength(2);
    expect(abilityItems[0]).toHaveTextContent('Static');
    expect(abilityItems[1]).toHaveTextContent('Battle Armor');
  });

  it('should call handleSearch when the submit button is clicked', () => {
    const handleSearch = jest.fn();
    render(<Filter handleSearch={handleSearch} />);
    const goButton = screen.getByTestId('search-btn');
    userEvent.click(goButton);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should call handleChangeLimit when the number of pokemons per page is changed', () => {
    const handleChangeLimit = jest.fn();

    render(<Filter handleChangeLimit={handleChangeLimit} />);

    const limitSelect = screen.getByTestId('limit-items');
    userEvent.selectOptions(limitSelect, ['20']);

    expect(handleChangeLimit).toHaveBeenCalledTimes(1);
    expect(handleChangeLimit).toHaveBeenCalledWith('20');
  });

  it('should call handleSelectAbility when an ability is selected', () => {
    const handleSelectAbility = jest.fn();

    render(<Filter abilities={abilities} handleSelectAbility={handleSelectAbility} />);

    const abilitySelect = screen.getByTestId('combo-ability');
    userEvent.selectOptions(abilitySelect, ['static']);

    expect(handleSelectAbility).toHaveBeenCalledTimes(1);
    expect(handleSelectAbility).toHaveBeenCalledWith('static');
  });
});
