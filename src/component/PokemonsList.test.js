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

let filteredPokemon = [];

describe('<PokemonsList />', () => {
  it('renders PokemonShortContainer component without filtering Pokemons if filteredPokemon is empty', () => {
    render(
      <PokemonsList
        pokemons={pokemons}
        filteredPokemon={filteredPokemon}
      />,
    );
    expect(screen.getByText(/{"name":"spearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/"}/i)).toBeInTheDocument();
    expect(screen.getByText(/{"name":"fearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/"}/i)).toBeInTheDocument();
  });

  it('renders PokemonShortContainer component without filtering Pokemons if filteredPokemon isn\'t empty', () => {
    filteredPokemon = ['spearow'];
    render(
      <PokemonsList
        pokemons={pokemons}
        filteredPokemon={filteredPokemon}
      />,
    );
    expect(screen.getByText(/{"name":"spearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/"}/i)).toBeInTheDocument();
    expect(screen.queryByText(/{"name":"fearow","url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/"}/i)).not.toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <PokemonsList
        pokemons={pokemons}
        filteredPokemon={filteredPokemon}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
