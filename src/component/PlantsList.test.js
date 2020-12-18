import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import PlantsList from './PlantsList';

jest.mock('../container/PlantShortContainer');

const plants = [
  {
    id: 1, common_name: 'foo1', scientific_name: 'bar1', image_url: 'foobar1',
  },
  {
    id: 2, common_name: 'foo2', scientific_name: 'bar2', image_url: 'foobar2',
  },
];

describe('<PlantsList />', () => {
  it('renders other component', () => {
    render(
      <PlantsList
        plants={plants}
      />,
    );
    expect(screen.getByText(/{"id":1,"commonName":"foo1","scientificName":"bar1","imageUrl":"foobar1"}/i)).toBeInTheDocument();
    expect(screen.getByText(/{"id":2,"commonName":"foo2","scientificName":"bar2","imageUrl":"foobar2"}/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <PlantsList
        plants={plants}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
