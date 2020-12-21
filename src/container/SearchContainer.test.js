import { render, screen } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SearchContainer from './SearchContainer';

const initStore = { pokemon: { search: 'Iv' } };
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

let renderReadyComponent;

let setState;
let useStateSpy;

beforeEach(() => {
  setState = jest.fn();
  useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  renderReadyComponent = (
    <Provider store={store}>
      <SearchContainer />
    </Provider>
  );
});

describe('<SearchContainer />', () => {
  it('is importing information from store', () => {
    render(
      renderReadyComponent,
    );
    expect(screen.getByPlaceholderText(/Search/i).value).toEqual('Iv');
  });
  it('is triggering handleChangeInput when input is changed', () => {
    render(
      renderReadyComponent,
    );
    userEvent.type(screen.getByPlaceholderText('Search'), 'y');
    expect(setState.mock.calls).toEqual([['Ivy']]);
  });

  it('is triggering handleClick when the button is clicked', () => {
    render(
      renderReadyComponent,
    );
    expect(store.dispatch.mock.calls.length).toEqual(0);
    userEvent.click(screen.getByAltText('Search icon to search'));
    expect(store.dispatch.mock.calls.length).toEqual(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
