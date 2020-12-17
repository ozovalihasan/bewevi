import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';

import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import OnePlantContainer from './OnePlantContainer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../component/OnePlant');

beforeEach(() => {
  useSelector.mockImplementation(selector => selector(
    {
      plant: {
        chosen: {
          common_name: 'Ivy common',
          scientific_name: 'Ivy scientific',
          image_url: 'Ivy.jpg',
          images: {
            fruit: [Error()],
            leaf: ['image.jpg'],
            flower: ['image.jpg'],
          },
        },
        loading: false,
      },
    },
  ));
});

describe('<PlantsListContainer />', () => {
  it('is connecting to store', () => {
    render(
      <OnePlantContainer />,
    );
    expect(screen.getByText(/Ivy scientific/i)).toBeInTheDocument();
    expect(screen.getByText(/Ivy common/i)).toBeInTheDocument();
  });

  it('is updating if there is an error when images are being installed', () => {
    render(
      <OnePlantContainer />,
    );
    expect(screen.getByAltText('test').src).toEqual('http://localhost/#');

    ReactTestUtils.Simulate.error(screen.getByAltText('test'));
    expect(screen.getByAltText('test').src).toEqual('http://localhost/emptyImage.svg');
  });

  it('renders Loading if loading is \'false\' in store', () => {
    useSelector.mockImplementation(selector => selector(
      {
        plant:
        {
          chosen: { },
          loading: true,
        },
      },
    ));
    const tree = renderer.create(<OnePlantContainer />).toJSON();
    expect(tree[0].props.className).toEqual('loading main');
  });

  it('renders correctly', () => {
    const renderedContainer = render(
      <OnePlantContainer />,
    );
    expect(renderedContainer).toMatchSnapshot();
  });
});
