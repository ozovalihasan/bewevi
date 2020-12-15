import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import PagesBar from './PagesBar';

const pages = [
  [3, 'Previous'],
  [4, '4'],
  [5, 'Next'],
];
const handleClick = jest.fn().mockImplementation(className => className + className);
const selfPage = 4;
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
    expect(screen.getByText(/4/i)).toBeInTheDocument();
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
    expect(handleClick.mock.calls[0][0]).toBe(3);

    userEvent.click(screen.getByText(/4/i));
    expect(handleClick.mock.calls.length).toBe(2);
    expect(handleClick.mock.calls[1][0]).toBe(4);

    userEvent.click(screen.getByText(/Next/i));
    expect(handleClick.mock.calls.length).toBe(3);
    expect(handleClick.mock.calls[2][0]).toBe(5);
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
