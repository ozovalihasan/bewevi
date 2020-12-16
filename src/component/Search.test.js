import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import userEvent from '@testing-library/user-event';
import Search from './Search';

let handleChangeInput;
let handleClick;
let searchInput;
let renderReadyComponent;

beforeEach(() => {
  handleChangeInput = jest.fn();
  handleClick = jest.fn();
  searchInput = 'foobar';
  renderReadyComponent = (
    <Search
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      searchInput={searchInput}
    />
  );
});

afterEach(() => {
  handleChangeInput.mockClear();
  handleClick.mockClear();
});

describe('<Search />', () => {
  it('renders an input with given searchInput value', () => {
    render(
      renderReadyComponent,
    );
    const searchBox = screen.getByPlaceholderText('Search');
    expect(searchBox.value).toBe(searchInput);
  });

  it('is triggering when search button is clicked', () => {
    render(
      renderReadyComponent,
    );
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Search/i));
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('is triggering handleChangeInput when there is a change of vale of input', () => {
    render(
      renderReadyComponent,
    );
    ReactTestUtils.Simulate.change(screen.getByPlaceholderText('Search'));
    expect(handleChangeInput.mock.calls.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      renderReadyComponent,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
