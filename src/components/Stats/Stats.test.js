import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';

describe('Stats', () => {
  const stats = [
    { stat: { name: 'hp' }, base_stat: 20 },
    { stat: { name: 'attack' }, base_stat: 30 },
    { stat: { name: 'defense' }, base_stat: 40 },
    { stat: { name: 'special-attack' }, base_stat: 50 },
    { stat: { name: 'special-defense' }, base_stat: 60 },
    { stat: { name: 'speed' }, base_stat: 70 },
  ];

  it('renders stat names and base stats', () => {
    render(<Stats stats={stats} />);
    expect(screen.getByText(/hp - 20/i)).toBeInTheDocument();
    expect(screen.getByText(/attack - 30/i)).toBeInTheDocument();
    expect(screen.getByText(/defense - 40/i)).toBeInTheDocument();
    expect(screen.getByText(/special attack - 50/i)).toBeInTheDocument();
    expect(screen.getByText(/special defense - 60/i)).toBeInTheDocument();
    expect(screen.getByText(/speed - 70/i)).toBeInTheDocument();
  });
});
