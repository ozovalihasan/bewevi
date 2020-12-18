import { render, screen } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import PagesBarContainer from './PagesBarContainer';

const initStore = {
  plant: {
    links: {
      last: 'ozovalihasan.com/page=43&word=ivy',
      self: 'ozovalihasan.com/page=42&word=ivy',
      first: 'ozovalihasan.com/page=1&word=ivy',
    },
  },
};
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

let renderReadyComponent;

beforeEach(() => {
  renderReadyComponent = (
    <Provider store={store}>
      <PagesBarContainer />
    </Provider>
  );
});

describe('<FilterContainer />', () => {
  it('is manipulating information taken from store', () => {
    render(
      renderReadyComponent,
    );
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/42/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('is triggering handleClick when the button is clicked', () => {
    render(
      renderReadyComponent,
    );
    expect(store.dispatch.mock.calls.length).toEqual(0);
    userEvent.click(screen.getByText('Previous'));
    expect(store.dispatch.mock.calls.length).toEqual(1);
    userEvent.click(screen.getByText('42'));
    expect(store.dispatch.mock.calls.length).toEqual(1);
    userEvent.click(screen.getByText('Next'));
    expect(store.dispatch.mock.calls.length).toEqual(2);
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
