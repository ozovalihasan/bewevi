import { render, screen } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import FilterContainer from './FilterContainer';

const initStore = { plant: { filter: 'common_name', filterInput: 'iv' } };
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
      <FilterContainer />
    </Provider>
  );
});

describe('<FilterContainer />', () => {
  it('is triggering handleChangeFilter when the filter is changed', () => {
    render(
      renderReadyComponent,
    );
    userEvent.selectOptions(screen.getByDisplayValue('Common Name'), ['year']);
    expect(setState.mock.calls).toEqual([['year']]);
  });

  it('is triggering handleChangeInput when input is changed', () => {
    render(
      renderReadyComponent,
    );
    userEvent.type(screen.getByPlaceholderText('Filter'), 'y');
    expect(setState.mock.calls).toEqual([['ivy']]);
  });

  it('is triggering handleClick when the button is clicked', () => {
    render(
      renderReadyComponent,
    );
    expect(store.dispatch.mock.calls.length).toEqual(0);
    userEvent.click(screen.getByAltText('Filter results'));
    expect(store.dispatch.mock.calls.length).toEqual(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
