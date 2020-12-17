import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import OnePlant from './OnePlant';

const handleError = jest.fn();
const plant = {
  image_url: 'www.ozovalihasan.com',
  images: {
    fruit: [{ imageUrl: 'www.ozovalihasan.com' }],
    leaf: [{ imageUrl: 'www.ozovalihasan.com' }],
    flower: [{ imageUrl: 'www.ozovalihasan.com' }],
  },
};

describe('<OnePlant />', () => {
  it('contains expected texts', () => {
    render(
      <BrowserRouter>
        <OnePlant
          plant={{
            image_url: null,
            images: {
              fruit: [null],
              leaf: [null],
              flower: [null],
            },
          }}
          handleError={handleError}

        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Fruit/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaf/i)).toBeInTheDocument();
    expect(screen.getByText(/Flower/i)).toBeInTheDocument();
  });

  it('triggers onError when there are errors of img tags', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <BrowserRouter>
        <OnePlant
          plant={plant}
          handleError={handleError}

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
        <OnePlant
          plant={plant}
          handleError={handleError}

        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
