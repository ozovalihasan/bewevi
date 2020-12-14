import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Filter from './Filter';

const handleChangeFilter = jest.fn();
const plantProperties = [['common_name', 'Common Name']];
const handleChangeInput = jest.fn();
const handleClick = jest.fn();
const filterInput = 'Microverse';

describe('<Filter />', () => {
  it('shows correct options and correct button name', () => {
    render(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filterInput={filterInput}
    />);
    expect(screen.getByText('Common Name')).toBeTruthy();
    expect(screen.getByText('Filter Results')).toBeTruthy();
  });

  it('call correct function when the button is clicked', () => {
    render(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filterInput={filterInput}
    />);
    expect(handleClick.mock.calls.length).toBe(0);
    fireEvent.click(screen.getByText('Filter Results'));
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filterInput={filterInput}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
