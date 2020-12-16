import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import ToggleFilterSearch from './ToggleFilterSearch';

let handleClick;
let shownContainer;
let renderReadyComponent;

jest.mock('./Logo');

beforeEach(() => {
  handleClick = jest.fn();
  shownContainer = <div>Shown Container</div>;
  renderReadyComponent = (
    <ToggleFilterSearch
      handleClick={handleClick}
      shownContainer={shownContainer}
    />
  );
});

afterEach(() => {
  handleClick.mockClear();
});

describe('<ToggleFilterSearch />', () => {
  it('renders given component as shownComponent and ', () => {
    render(
      renderReadyComponent,
    );

    expect(screen.getByText(/Shown Container/i)).toBeInTheDocument();
    // expect(screen.getByText(/bar/i)).toBeInTheDocument();
    // userEvent.click(screen.getByText(/bar/i));
    // expect(screen.getByText(/One Plant Page/i)).toBeInTheDocument();
  });

  it('renders Logo component ', () => {
    render(
      renderReadyComponent,
    );

    expect(screen.getByText(/This is a Logo/i)).toBeInTheDocument();
  });

  it('is triggering handleClick when the link is clicked', () => {
    render(
      renderReadyComponent,
    );

    userEvent.click(screen.getByText(/Filter/i));
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      renderReadyComponent,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
