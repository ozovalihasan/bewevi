import configureMockStore from 'redux-mock-store';
// import { applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  PLANT_REQUEST,
  PLANT_FAILURE,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_PLANT,
} from './plantTypes';

import {
  plantRequest,
  plantFailure,
  addAllPlants,
  updateFilter,
  updateSearch,
  updateSelectedPlant,
  axiosBlock,
  fetchPlantsList,
  fetchPlantsUpdate,
  fetchPlantsSearch,
  openPlantPage,
  fetchSelectedPlant,
} from './plantActions';
import plantReducer from './plantReducer';

let middlewares;
let mockStore;
let store;

beforeEach(() => {
  middlewares = [thunk];
  mockStore = configureMockStore(middlewares);
  store = mockStore({});
});

afterEach(() => {
  store.clearActions();
});

jest.mock('axios');

describe('Plant actions', () => {
  describe('plantRequest', () => {
    it('should return default state', () => {
      const action = plantRequest();
      expect(action).toEqual({ type: PLANT_REQUEST });
    });
  });

  describe('plantFailure', () => {
    it('should return default state', () => {
      const action = plantFailure('There is an error');
      expect(action).toEqual({ type: PLANT_FAILURE, payload: 'There is an error' });
    });
  });

  describe('addAllPlants', () => {
    it('should return default state', () => {
      const action = addAllPlants('Plants');
      expect(action).toEqual({ type: ADD_ALL_PLANTS, payload: 'Plants' });
    });
  });

  describe('updateFilter', () => {
    it('should return default state', () => {
      const action = updateFilter({ filter: 'name', filterInput: 'ivy' });
      expect(action).toEqual({ type: UPDATE_FILTER, payload: { filter: 'name', filterInput: 'ivy' } });
    });
  });

  describe('updateSearch', () => {
    it('should return default state', () => {
      const action = updateSearch({ searchInput: 'ivy' });
      expect(action).toEqual({ type: UPDATE_SEARCH, payload: 'ivy' });
    });
  });

  describe('updateSelectedPlant', () => {
    it('should return default state', () => {
      const action = updateSelectedPlant({ data: 'plant' });
      expect(action).toEqual({ type: UPDATE_SELECTED_PLANT, payload: 'plant' });
    });
  });

  describe('axiosBlock', () => {
    it('should dispatch plantRequest action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants' }));
      store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPlants, dispatch); });
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
      ]);
    });

    it('should dispatch given action when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants', status: 200 }));
      await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPlants, dispatch); });
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'ADD_ALL_PLANTS', payload: 'Plants' },
      ]);
    });

    it('should dispatch given action when response fails ', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Site Not Found', status: 404 }));
      await (await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPlants, dispatch); }));
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'PLANT_FAILURE', payload: 404 },
      ]);
    });

    it('should dispatch given action if there is an error when request is sent', async () => {
      axios.mockImplementationOnce(() => Promise.reject());
      await (await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPlants, dispatch); }));
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'PLANT_FAILURE' },
      ]);
    });
  });

  describe('fetchPlantsList', () => {
    it('should dispatch addAllPlants when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants', status: 200 }));
      await store.dispatch(fetchPlantsList());
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'ADD_ALL_PLANTS', payload: 'Plants' },
      ]);
    });
  });

  describe('fetchPlantsUpdate', () => {
    it('should dispatch updateFilter action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants' }));
      store.dispatch(fetchPlantsUpdate({ filter: 'name', filterInput: 'Ivy' }));
      expect(store.getActions()).toEqual([
        {
          type: 'UPDATE_FILTER',
          payload: { filter: 'name', filterInput: 'Ivy' },
        },
        { type: 'PLANT_REQUEST' },
      ]);
    });

    it('should dispatch addAllPlants when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants', status: 200 }));
      await store.dispatch(fetchPlantsUpdate({ filter: 'name', filterInput: 'Ivy' }));
      // console.warn(store.getActions());
      expect(store.getActions()).toEqual([
        {
          type: 'UPDATE_FILTER',
          payload: { filter: 'name', filterInput: 'Ivy' },
        },
        { type: 'PLANT_REQUEST' },
        { type: 'ADD_ALL_PLANTS', payload: 'Plants' },

      ]);
    });
  });
  describe('fetchPlantsSearch', () => {
    it('should dispatch updateFilter action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants' }));
      store.dispatch(fetchPlantsSearch({ searchInput: 'Ivy' }));
      expect(store.getActions()).toEqual([
        { type: 'UPDATE_SEARCH', payload: 'Ivy' },
        { type: 'PLANT_REQUEST' },
      ]);
    });

    it('should dispatch addAllPlants when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants', status: 200 }));
      await store.dispatch(fetchPlantsSearch({ searchInput: 'Ivy' }));
      console.warn(store.getActions());

      expect(store.getActions()).toEqual([
        { type: 'UPDATE_SEARCH', payload: 'Ivy' },
        { type: 'PLANT_REQUEST' },
        { type: 'ADD_ALL_PLANTS', payload: 'Plants' },
      ]);
    });
  });

  describe('openPlantPage', () => {
    it('should dispatch addAllPlants when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Plants', status: 200 }));
      await store.dispatch(openPlantPage('page=2'));
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'ADD_ALL_PLANTS', payload: 'Plants' },
      ]);
    });
  });

  describe('fetchSelectedPlant', () => {
    it('should dispatch updateSelectedPlant when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: { data: 'Plants' }, status: 200 }));
      await store.dispatch(fetchSelectedPlant(1993));
      expect(store.getActions()).toEqual([
        { type: 'PLANT_REQUEST' },
        { type: 'UPDATE_SELECTED_PLANT', payload: 'Plants' },
      ]);
    });
  });
});
