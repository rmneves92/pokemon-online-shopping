import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';

describe('Filter', () => {
  it('should call handleSearch when the search button is clicked', () => {
    const handleSearch = jest.fn();

    const ref = { current: '' };

    render(<Filter handleSearch={handleSearch} ref={ref} />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-btn');

    userEvent.type(searchInput, 'pikachu');
    userEvent.click(searchButton);

    expect(handleSearch).toHaveBeenCalledWith('pikachu');
  });

  it('should call handleSelectAbility when an ability is selected', () => {
    const handleSelectAbility = jest.fn();

    const abilities = [{ name: 'electric' }, { name: 'water' }];

    render(<Filter handleSelectAbility={handleSelectAbility} abilities={abilities} />);
    const abilityCombo = screen.getByTestId('combo-ability');

    userEvent.selectOptions(abilityCombo, ['water']);

    expect(handleSelectAbility).toHaveBeenCalledWith('water');
  });

  it('should call handleChangeLimit when the limit is changed', () => {
    const handleChangeLimit = jest.fn();

    render(<Filter handleChangeLimit={handleChangeLimit} />);
    const limitCombo = screen.getByTestId('limit-items');

    userEvent.selectOptions(limitCombo, ['20']);

    expect(handleChangeLimit).toHaveBeenCalledWith('20');
  });

  it('should update the ref when the search query is changed', () => {
    const ref = { current: '' };

    render(<Filter ref={ref} />);
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'mewtwo');

    expect(ref.current).toBe('mewtwo');
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
});
