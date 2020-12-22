import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import OnePokemon from './OnePokemon';

const handleError = jest.fn();
const pokemon = {
  name: 'venusaur',
  weight: 0.2,
  height: 20,

};
const color = 'green';
const habitat = 'grassland';
const shape = 'quadruped';

const evolutionChain = ['1', '2', '3'];
describe('<OnePokemon />', () => {
  it('contains expected texts', () => {
    render(
      <BrowserRouter>
        <OnePokemon
          pokemon={pokemon}
          handleError={handleError}
          color={color}
          habitat={habitat}
          shape={shape}
          evolutionChain={evolutionChain}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/grassland/i)).toBeInTheDocument();
    expect(screen.getByText(/quadruped/i)).toBeInTheDocument();
    expect(screen.getByText(/2kg/i)).toBeInTheDocument();
    expect(screen.getByText(/200cm/i)).toBeInTheDocument();
  });

  it('triggers onError when there are errors of img tags', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <BrowserRouter>
        <OnePokemon
          pokemon={pokemon}
          handleError={handleError}
          color={color}
          habitat={habitat}
          shape={shape}
          evolutionChain={evolutionChain}
        />
      </BrowserRouter>,
    );

    const imgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'img');
    imgs.map(img => ReactTestUtils.Simulate.error(img));
    expect(handleError.mock.calls.length).toBe(4);
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <OnePokemon
          pokemon={pokemon}
          handleError={handleError}
          color={color}
          habitat={habitat}
          shape={shape}
          evolutionChain={evolutionChain}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
