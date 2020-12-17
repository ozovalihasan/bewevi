import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import ReactTestUtils from 'react-dom/test-utils';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import PlantShort from './PlantShort';

let plant;
let handleClick;
let handleError;

beforeEach(() => {
  handleError = jest.fn();
  plant = {
    id: 1993,
    commonName: 'foo',
    scientificName: 'bar',
    imageUrl: 'foobar',
  };
  handleClick = jest.fn();
});

afterEach(() => {
  handleClick.mockClear();
  handleError.mockClear();
});

describe('<PlantShort />', () => {
  it('renders a link to one plant page', () => {
    render(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
        />
        <Redirect to="/" />
        <Switch>
          <Route exact path="/" render={() => <>Main Page</>} />
          <Route exact path="/one-plant" render={() => <div>One Plant Page</div>} />
        </Switch>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
    expect(screen.getByText(/bar/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/bar/i));
    expect(screen.getByText(/One Plant Page/i)).toBeInTheDocument();
  });
  it('is triggering handleClick when the link is clicked', () => {
    render(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    );

    userEvent.click(screen.getByText(/bar/i));
    expect(handleClick.mock.calls.length).toBe(1);
    expect(handleClick.mock.calls[0][0]).toBe(1993);
  });

  it('triggers onError when there are errors of img tags', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    );
    const imgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'img');
    imgs.map(img => ReactTestUtils.Simulate.error(img));
    expect(handleError.mock.calls.length).toBe(1);
  });

  it('is rendering \'no common name\' if common name of the plant doesn\'t exist ', () => {
    plant.commonName = null;
    render(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/No common name/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
