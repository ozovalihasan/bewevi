import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PlantsListContainer from './PlantsListContainer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockImplementation(selector => selector(
    {
      plant: {
        plants: [{
          id: 1, common_name: 'Ivy common', scientific_name: 'Ivy scientific', image_url: 'Ivy.jpg',
        }, {
          id: 2, common_name: 'Ivy common2', scientific_name: 'Ivy scientific2', image_url: 'Ivy2.jpg',
        }],
      },
    },
  ));
});

describe('<PlantsListContainer />', () => {
  it('is rendering PlantsList component', () => {
    render(
      <BrowserRouter>
        <PlantsListContainer />
      </BrowserRouter>,
    );
    expect(screen.getAllByText(/Ivy scientific/i).length).toEqual(2);
  });

  it('renders correctly', () => {
    const renderedContainer = render(
      <BrowserRouter>
        <PlantsListContainer />
      </BrowserRouter>,
    );
    expect(renderedContainer).toMatchSnapshot();
  });
});
