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
let emptyImage;

beforeEach(() => {
  handleClick = jest.fn().mockImplementation(plantId => plantId);
  handleError = jest.fn();
  emptyImage = jest.fn(className => className);
  plant = {
    id: 1993,
    commonName: 'foo',
    scientificName: 'bar',
    imageUrl: 'foobar',
  };
});

afterEach(() => {
  handleClick.mockClear();
  handleError.mockClear();
  emptyImage.mockClear();
});

describe('<PlantShort />', () => {
  it('renders a link to one plant page', () => {
    render(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
          emptyImage={emptyImage}
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
          emptyImage={emptyImage}
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
          emptyImage={emptyImage}
        />
      </BrowserRouter>,
    );
    const imgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'img');
    imgs.map(img => ReactTestUtils.Simulate.error(img));
    expect(handleError.mock.calls.length).toBe(1);
  });

  it('is calling default image if URL of image of the plant doesn\'t exist', () => {
    plant.imageUrl = null;
    render(
      <BrowserRouter>
        <PlantShort
          plant={
            plant
          }
          handleError={handleError}
          handleClick={handleClick}
          emptyImage={emptyImage}
        />
      </BrowserRouter>,
    );
    expect(emptyImage.mock.calls.length).toBe(1);
    expect(emptyImage.mock.calls[0][0]).toBe('plant-short plant-image');
  });
  it('is rendering \'no common name\' if common name of the plant doesn\'t exist ', () => {
    plant.commonName = null;
    render(
      <BrowserRouter>
        <PlantShort
          plant={plant}
          handleError={handleError}
          handleClick={handleClick}
          emptyImage={emptyImage}
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
          emptyImage={emptyImage}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
