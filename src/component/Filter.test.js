import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Filter from './Filter';

const handleChangeFilter = jest.fn();
const plantProperties = [['all', 'All'], ['common_name', 'Common Name']];
const handleChangeInput = jest.fn();
const handleClick = jest.fn();
let filter;
let filterInput;

describe('<Filter />', () => {
  it('shows correct options, not input and filter icon', () => {
    filter = 'all';
    filterInput = '';
    render(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filter={filter}
      filterInput={filterInput}
    />);
    expect(screen.queryByDisplayValue('All')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Filter')).not.toBeTruthy();
    expect(screen.queryByAltText('Filter Results')).not.toBeTruthy();
  });

  it('shows correct options and input, not filter icon when any options except \'all\' is chosen ', () => {
    filter = 'common_name';
    filterInput = '';
    render(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filter={filter}
      filterInput={filterInput}
    />);
    expect(screen.queryByDisplayValue('Common Name')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Filter')).toBeTruthy();
    expect(screen.queryByAltText('Filter Results')).not.toBeTruthy();
  });

  it('shows correct options, input and filter icon when input is not empty', () => {
    filter = 'common_name';
    filterInput = 'ivy';
    render(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filter={filter}
      filterInput={filterInput}
    />);
    expect(screen.queryByDisplayValue('Common Name')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Filter')).toBeTruthy();
    expect(screen.queryByAltText('Filter results')).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filter={filter}
      filterInput={filterInput}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
