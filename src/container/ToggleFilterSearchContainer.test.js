import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ToggleFilterSearchContainer from './ToggleFilterSearchContainer';

let setState;
let useStateSpy;

let renderReadyComponent;

jest.mock('./SearchContainer', () => {
  const SearchContainer = () => (<div>Mock Search Container </div>);
  SearchContainer.displayName = 'SearchContainer';
  return SearchContainer;
});

jest.mock('./FilterContainer', () => {
  const FilterContainer = () => (<div>Mock Filter Container </div>);
  FilterContainer.displayName = 'FilterContainer';
  return FilterContainer;
});

jest.mock('../component/Logo', () => {
  const Logo = () => (<div>Mock Logo</div>);
  Logo.displayName = 'Logo';
  return Logo;
});

beforeEach(() => {
  setState = jest.fn();
  useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  renderReadyComponent = (
    <ToggleFilterSearchContainer />
  );
});

describe('<ToggleFilterSearchContainer />', () => {
  it('is rendering SearchContainer and show button with \'filter\' text', () => {
    render(
      renderReadyComponent,
    );
    expect(screen.queryByText(/Mock Logo/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mock Search Container/i)).toBeInTheDocument();
    expect(screen.queryByText(/Filter/i)).toBeInTheDocument();
  });

  it('is changing rendered component when the button is clicked', () => {
    render(
      renderReadyComponent,
    );
    expect(screen.queryByText(/Mock Search Container/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mock Filter Container/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Filter'));
    expect(screen.queryByText(/Mock Search Container/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Mock Filter Container/i)).toBeInTheDocument();
    expect(screen.queryByText(/Search/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
