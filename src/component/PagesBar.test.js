import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import PagesBar from './PagesBar';

const pages = [

  ['https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 'Previous'],
  ['https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', '2'],
  ['https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20', 'Next'],
];
const selfPage = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';
let handleClick;

beforeEach(() => {
  handleClick = jest.fn();
});

describe('<PagesBar />', () => {
  it('contains expected texts', () => {
    render(
      <PagesBar
        pages={pages}
        handleClick={handleClick}
        selfPage={selfPage}
      />,
    );

    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('is triggering handleClick correctly', () => {
    render(
      <PagesBar
        pages={pages}
        handleClick={handleClick}
        selfPage={selfPage}
      />,
    );

    userEvent.click(screen.getByText(/Previous/i));
    expect(handleClick.mock.calls.length).toBe(1);
    expect(handleClick.mock.calls[0][0]).toBe('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');

    userEvent.click(screen.getByText(/2/i));
    expect(handleClick.mock.calls.length).toBe(2);
    expect(handleClick.mock.calls[1][0]).toBe(selfPage);

    userEvent.click(screen.getByText(/Next/i));
    expect(handleClick.mock.calls.length).toBe(3);
    expect(handleClick.mock.calls[2][0]).toBe('https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20');
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <PagesBar
        pages={pages}
        handleClick={handleClick}
        selfPage={selfPage}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
