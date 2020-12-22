import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import PokemonShortContainer from './PokemonShortContainer';

const mockStore = configureStore();
const store = mockStore();
store.dispatch = jest.fn();

jest.mock('../component/PokemonShort');

const pokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/21/',
  name: 'raichu',
};

let renderReadyComponent;

beforeEach(() => {
  renderReadyComponent = (
    <Provider store={store}>
      <BrowserRouter>
        <PokemonShortContainer pokemon={pokemon} />
      </BrowserRouter>
    </Provider>
  );
});

describe('<PokemonShortContainer />', () => {
  it('is triggering handleError if there is an error related to img tag', () => {
    render(renderReadyComponent);
    ReactTestUtils.Simulate.error(screen.getByAltText('test'));
    expect(screen.getByAltText('test').src).toEqual('http://localhost/emptyImage.svg');
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
