import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import { useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';

import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import OnePokemonContainer from './OnePokemonContainer';

const initStore = {};
const initStoreReset = () => {
  initStore.pokemon = {
    loading: false,
    initialized: false,
    chosen: {
      id: 3,
    },
    color: 'green',
    habitat: 'grassland',
    shape: 'quadruped',
    evolutionChain: ['1', '2', '3'],
  };
};
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

jest.mock('../component/OnePokemon');

beforeEach(() => {
  initStoreReset();
});

describe('<PokemonsListContainer />', () => {
  it('is connecting to store and show stored pokemon if ids of the stored pokemon and selected pokemon are same', () => {
    render(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '3' } }} />
      </Provider>,
    );
    expect(screen.getByText(/grassland/i)).toBeInTheDocument();
    expect(screen.getByText(/quadruped/i)).toBeInTheDocument();
    expect(screen.getByText(/["1","2","3"]/i)).toBeInTheDocument();
  });

  it('is updating if there is an error when images are being installed', () => {
    initStore.pokemon.loading = false;
    render(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '3' } }} />
      </Provider>,
    );

    expect(screen.getByAltText('test').src).toEqual('http://localhost/#');
    ReactTestUtils.Simulate.error(screen.getByAltText('test'));
    expect(screen.getByAltText('test').src).toEqual('http://localhost/emptyImage.svg');
  });

  it('renders Loading if loading is \'true\' in store', () => {
    initStore.pokemon.loading = true;
    const tree = renderer.create(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '2' } }} />
      </Provider>,
    ).toJSON();

    expect(tree.props.className).toEqual('loading main');
  });

  it('dispatch fetchSelectedPokemon if id of the stored pokemon doesn\'t exist', () => {
    initStore.pokemon.chosen = {};
    render(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '2' } }} />
      </Provider>,
    );
    expect(store.dispatch.mock.calls.length).toEqual(1);
  });

  it('dispatch fetchSelectedPokemon if ids of the stored pokemon and selected pokemon are different ', () => {
    initStore.pokemon.loading = false;
    render(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '2' } }} />
      </Provider>,
    );

    expect(store.dispatch.mock.calls.length).toEqual(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(
      <Provider store={store}>
        <OnePokemonContainer match={{ params: { id: '3' } }} />
      </Provider>,
    );
    expect(renderedContainer).toMatchSnapshot();
  });
});
