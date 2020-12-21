import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_POKEMON,
} from './pokemonTypes';

import pokemonReducer from './pokemonReducer';

describe('Pokemon Reducer', () => {
  it('should return default state', () => {
    const state = pokemonReducer(undefined, {});
    expect(state).toEqual({});
  });

  it('should return state with loading as true', () => {
    const state = pokemonReducer(undefined, {
      type: POKEMON_REQUEST,
    });
    expect(state).toEqual({ loading: true });
  });

  it('should return state with an error', () => {
    const state = pokemonReducer(undefined, {
      type: POKEMON_FAILURE,
      payload: 'There is an error',
    });
    expect(state).toEqual({ loading: false, error: 'There is an error' });
  });

  it('should return state with the information of pokemons chosen arbitrarily', () => {
    const state = pokemonReducer(undefined, {
      type: ADD_ALL_POKEMONS,
      payload: { data: 'data of pokemons', links: 'the links of requested page' },
    });
    expect(state).toEqual({
      initialized: true,
      loading: false,
      pokemons: 'data of pokemons',
      links: 'the links of requested page',
      error: '',
    });
  });

  it('should return state with filter name and filter input', () => {
    const state = pokemonReducer(undefined, {
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
    const state = pokemonReducer(undefined, {
      type: UPDATE_SEARCH,
      payload: 'input of the searchbox',
    });
    expect(state).toEqual({ search: 'input of the searchbox', error: '' });
  });

  it('should return state with loading as true', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_SELECTED_POKEMON,
      payload: 'information of the chosen pokemon',
    });
    expect(state).toEqual({
      loading: false,
      chosen: 'information of the chosen pokemon',
      error: '',
    });
  });
});
