import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import PokemonsList from './PokemonsList';

jest.mock('../container/PokemonShortContainer');

const pokemons = [
  {
    name: 'spearow',
    url: 'https://pokeapi.co/api/v2/pokemon/21/',
  },
  {
    name: 'fearow',
    url: 'https://pokeapi.co/api/v2/pokemon/22/',
  },
];

describe('<PokemonsList />', () => {
  it('renders other component', () => {
    render(
      <PokemonsList
        pokemons={pokemons}
      />,
    );
    expect(screen.getByText(/{"name":"spearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/"}/i)).toBeInTheDocument();
    expect(screen.getByText(/{"name":"fearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/"}/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <PokemonsList
        pokemons={pokemons}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
