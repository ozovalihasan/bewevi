import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import ReactTestUtils from 'react-dom/test-utils';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import PokemonShort from './PokemonShort';

let pokemon;
let handleClick;
let handleError;

beforeEach(() => {
  handleError = jest.fn();
  pokemon = {
    id: '10',
    name: 'raichu',
  };
  handleClick = jest.fn();
});

afterEach(() => {
  handleClick.mockClear();
  handleError.mockClear();
});

describe('<PokemonShort />', () => {
  it('renders a link to one pokemon page', () => {
    render(
      <BrowserRouter>
        <PokemonShort
          pokemon={pokemon}
          handleError={handleError}
          handleClick={handleClick}
        />
        <Redirect to="/" />
        <Switch>
          <Route exact path="/" render={() => <>Main Page</>} />
          <Route exact path={`/one-pokemon/${pokemon.id}`} render={() => <div>One Pokemon Page</div>} />
        </Switch>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
    expect(screen.getByText(/raichu/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/raichu/i));
    expect(screen.getByText(/One Pokemon Page/i)).toBeInTheDocument();
  });

  it('triggers onError when there are errors of img tags', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <BrowserRouter>
        <PokemonShort
          pokemon={pokemon}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    );
    const imgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'img');
    imgs.map(img => ReactTestUtils.Simulate.error(img));
    expect(handleError.mock.calls.length).toBe(1);
  });

  it('is rendering \'No  Name\' if name of the pokemon doesn\'t exist ', () => {
    pokemon.name = null;
    render(
      <BrowserRouter>
        <PokemonShort
          pokemon={pokemon}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/No Name/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <PokemonShort
          pokemon={pokemon}
          handleError={handleError}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
