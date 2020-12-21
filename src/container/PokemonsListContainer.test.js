import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PokemonsListContainer from './PokemonsListContainer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockImplementation(selector => selector(
    {
      pokemon: {
        pokemons: [{
          id: 1, common_name: 'Ivy common', scientific_name: 'Ivy scientific', image_url: 'Ivy.jpg',
        }, {
          id: 2, common_name: 'Ivy common2', scientific_name: 'Ivy scientific2', image_url: 'Ivy2.jpg',
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
    expect(screen.getAllByText(/Ivy scientific/i).length).toEqual(2);
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
