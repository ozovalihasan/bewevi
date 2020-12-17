import {
  PLANT_REQUEST,
  PLANT_FAILURE,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_PLANT,
} from './plantTypes';

import plantReducer from './plantReducer';

describe('Plant Reducer', () => {
  it('should return default state', () => {
    const state = plantReducer(undefined, {});
    expect(state).toEqual({});
  });

  it('should return state with loading as true', () => {
    const state = plantReducer(undefined, {
      type: PLANT_REQUEST,
    });
    expect(state).toEqual({ loading: true });
  });

  it('should return state with an error', () => {
    const state = plantReducer(undefined, {
      type: PLANT_FAILURE,
      payload: 'There is an error',
    });
    expect(state).toEqual({ loading: false, error: 'There is an error' });
  });

  it('should return state with the information of plants chosen arbitrarily', () => {
    const state = plantReducer(undefined, {
      type: ADD_ALL_PLANTS,
      payload: { data: 'data of plants', links: 'the links of requested page' },
    });
    expect(state).toEqual({
      initialized: true,
      loading: false,
      plants: 'data of plants',
      links: 'the links of requested page',
      error: '',
    });
  });

  it('should return state with filter name and filter input', () => {
    const state = plantReducer(undefined, {
      type: UPDATE_FILTER,
      payload: { filter: 'filter name', filterInput: 'input of the filter' },
    });
    expect(state).toEqual({
      filter: 'filter name',
      filterInput: 'input of the filter',
      error: '',
    });
  });

  it('should return state with the word being searched', () => {
    const state = plantReducer(undefined, {
      type: UPDATE_SEARCH,
      payload: 'input of the searchbox',
    });
    expect(state).toEqual({ search: 'input of the searchbox', error: '' });
  });

  it('should return state with loading as true', () => {
    const state = plantReducer(undefined, {
      type: UPDATE_SELECTED_PLANT,
      payload: 'information of the chosen plant',
    });
    expect(state).toEqual({
      loading: false,
      chosen: 'information of the chosen plant',
      error: '',
    });
  });
});
