import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

jest.mock('./Logo', () => {
  const Logo = () => (<div>Mock Logo </div>);
  Logo.displayName = 'Logo';
  return Logo;
});

jest.mock('../container/FilterContainer', () => {
  const FilterContainer = () => (<div>Mock Filter Container </div>);
  FilterContainer.displayName = 'FilterContainer';
  return FilterContainer;
});

describe('<Header />', () => {
  it('is connecting store and rendering PokemonsList component with imported values', () => {
    render(<Header />);
    expect(screen.getByText(/Mock Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Filter Container/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(<Header />);
    expect(renderedContainer).toMatchSnapshot();
  });
});
