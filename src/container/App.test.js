import { render, screen } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import App from './App';

const initStore = { plant: {} };
const initStoreReset = () => { initStore.plant = { initialized: false, loading: false }; };
const mockStore = configureStore();
const store = mockStore(initStore);
store.dispatch = jest.fn();

jest.mock('../component/Loading', () => {
  const Loading = () => (<div>Mock Loading </div>);
  Loading.displayName = 'Loading';
  return Loading;
});
jest.mock('./ToggleFilterSearchContainer', () => {
  const ToggleFilterSearchContainer = () => (<div>Mock Toggle Filter Search Container </div>);
  ToggleFilterSearchContainer.displayName = 'ToggleFilterSearchContainer';
  return ToggleFilterSearchContainer;
});
jest.mock('./PlantsListContainer', () => {
  const PlantsListContainer = () => (<div>Mock Plants List Container </div>);
  PlantsListContainer.displayName = 'PlantsListContainer';
  return PlantsListContainer;
});
jest.mock('./PagesBarContainer', () => {
  const PagesBarContainer = () => (<div>Mock Pages Bar Container </div>);
  PagesBarContainer.displayName = 'PagesBarContainer';
  return PagesBarContainer;
});

let renderReadyComponent;

beforeEach(() => {
  initStoreReset();
  renderReadyComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  );
});

afterEach(() => {
  store.clearActions();
});

describe('<App />', () => {
  describe('If the app is not initialized', () => {
    it('is dispatching fetchPlantList action and not rendering any component if the app isn\'t being loaded ', () => {
      render(
        renderReadyComponent,
      );
      expect(store.dispatch.mock.calls.length).toEqual(1);

      expect(screen.queryByText(/Mock Loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mock Toggle Filter Search Container/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mock Plants List Container/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mock Pages Bar Container/i)).not.toBeInTheDocument();
    });

    it('is rendering Loading if the app is being loaded', () => {
      initStore.plant.loading = true;
      render(
        renderReadyComponent,
      );
      expect(screen.queryByText(/Mock Loading/i)).toBeInTheDocument();
    });
  });

  describe('If the app is initialized', () => {
    it('is rendering all components except Loading if the app isn\'t being loaded ', () => {
      initStore.plant.initialized = true;
      render(
        renderReadyComponent,
      );

      expect(screen.queryByText(/Mock Loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mock Toggle Filter Search Container/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mock Plants List Container/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mock Pages Bar Container/i)).toBeInTheDocument();
    });

    it('is rendering Loading if the app is being loaded', () => {
      initStore.plant.loading = true;
      initStore.plant.initialized = true;
      render(
        renderReadyComponent,
      );
      expect(screen.queryByText(/Mock Loading/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mock Toggle Filter Search Container/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mock Plants List Container/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mock Pages Bar Container/i)).toBeInTheDocument();
    });
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
