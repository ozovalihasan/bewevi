import { render, screen } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import FilterContainer from './FilterContainer';

const initStore = { pokemon: { filter: { categoryList: ['ball', 'fish'] } } };
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

let renderReadyComponent;

let setState;
let useStateSpy;

beforeEach(() => {
  setState = jest.fn();
  useStateSpy = jest.spyOn(React, 'useState');

  renderReadyComponent = (
    <Provider store={store}>
      <FilterContainer />
    </Provider>
  );
});

describe('<FilterContainer />', () => {
  describe('handleChangeCategory is triggered when the filter category is changed', () => {
    it('calls useState and dispatches fetchCategoryName if chosen category is not \'All\'', () => {
      useStateSpy.mockImplementation(init => [init, setState]);
      render(
        renderReadyComponent,
      );
      userEvent.selectOptions(screen.getByDisplayValue('Filter By Category'), ['Shape']);
      expect(setState.mock.calls).toEqual([['pokemon-shape/']]);
      expect(store.dispatch.mock.calls.length).toEqual(1);
    });

    it('calls useState two times and dispatches updateFilterPokemon if chosen category is  \'All\'', () => {
      useStateSpy.mockImplementation(init => [init, setState]);
      render(
        renderReadyComponent,
      );
      userEvent.selectOptions(screen.getByDisplayValue('Filter By Category'), ['All']);
      expect(setState.mock.calls).toEqual([['All'], ['Filter Name']]);
      expect(store.dispatch.mock.calls.length).toEqual(1);
    });
  });

  describe('handleFilterName is triggered when the filter category is chosen and the filter name is changed', () => {
    it('calls useState and dispatches fetchCategoryName if chosen category is not \'All\'', () => {
      useStateSpy.mockImplementationOnce(() => ['Shape', setState]);
      useStateSpy.mockImplementation(init => [init, setState]);
      render(
        renderReadyComponent,
      );
      userEvent.selectOptions(screen.getByDisplayValue('Filter Name'), ['Ball']);
      expect(setState.mock.calls).toEqual([['ball']]);
      expect(store.dispatch.mock.calls.length).toEqual(1);
    });

    it('calls useState two times and dispatches updateFilterPokemon if chosen category is  \'All\'', () => {
      useStateSpy.mockImplementationOnce(() => ['Shape', setState]);
      useStateSpy.mockImplementation(init => [init, setState]);
      render(
        renderReadyComponent,
      );
      userEvent.selectOptions(screen.getByDisplayValue('Filter Name'), ['All']);
      expect(setState.mock.calls).toEqual([['All']]);
      expect(store.dispatch.mock.calls.length).toEqual(1);
    });
  });

  it('renders correctly without filter category is not chosen', () => {
    useStateSpy.mockImplementation(init => [init, setState]);
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });

  it('renders correctly without filter category is chosen', () => {
    useStateSpy.mockImplementationOnce(() => ['Shape', setState]);
    useStateSpy.mockImplementation(init => [init, setState]);
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
