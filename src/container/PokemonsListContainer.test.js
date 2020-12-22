import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PokemonsListContainer from './PokemonsListContainer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockImplementation(selector => selector(
    {
      pokemon: {
        pokemons: [{
          name: 'spearow',
          url: 'https://pokeapi.co/api/v2/pokemon/21/',
        }, {
          name: 'fearow',
          url: 'https://pokeapi.co/api/v2/pokemon/22/',
        }],
      },
    },
  ));
});

describe('<PokemonsListContainer />', () => {
  it('is rendering PokemonsList component', () => {
    render(
      <BrowserRouter>
        <PokemonsListContainer />
      </BrowserRouter>,
    );
    expect(screen.getAllByText(/spearow/i).length).toEqual(1);
    expect(screen.getAllByText(/fearow/i).length).toEqual(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(
      <BrowserRouter>
        <PokemonsListContainer />
      </BrowserRouter>,
    );
    expect(renderedContainer).toMatchSnapshot();
  });
});
