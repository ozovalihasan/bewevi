import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PokemonsListContainer from './PokemonsListContainer';

const initStore = {
  pokemon: {
    pokemons: [{
      name: 'spearow',
      url: 'https://pokeapi.co/api/v2/pokemon/21/',
    },
    {
      name: 'fearow',
      url: 'https://pokeapi.co/api/v2/pokemon/22/',
    }],
  },
};
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

jest.mock('./PagesBarContainer', () => {
  const PagesBarContainer = () => (<div>Mock Pages Bar Container </div>);
  PagesBarContainer.displayName = 'PagesBarContainer';
  return PagesBarContainer;
});

const renderReadyComponent = (
  <Provider store={store}>
    <BrowserRouter>
      <PokemonsListContainer />
    </BrowserRouter>
  </Provider>
);

describe('<PokemonsListContainer />', () => {
  it('is connecting store and rendering PokemonsList component with imported values', () => {
    render(renderReadyComponent);
    expect(screen.getAllByText(/spearow/i).length).toEqual(1);
    expect(screen.getAllByText(/fearow/i).length).toEqual(1);
  });

  it('is rendering PagesBarContainer component', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/Mock Pages Bar Container/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
