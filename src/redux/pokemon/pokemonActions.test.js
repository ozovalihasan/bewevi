import configureMockStore from 'redux-mock-store';
// import { applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_POKEMON,
} from './pokemonTypes';

import {
  pokemonRequest,
  pokemonFailure,
  addAllPokemons,
  updateFilter,
  updateSearch,
  updateSelectedPokemon,
  axiosBlock,
  fetchPokemonsList,
  fetchPokemonsUpdate,
  fetchPokemonsSearch,
  openPokemonPage,
  fetchSelectedPokemon,
} from './pokemonActions';

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

describe('Pokemon actions', () => {
  describe('pokemonRequest', () => {
    it('should return default state', () => {
      const action = pokemonRequest();
      expect(action).toEqual({ type: POKEMON_REQUEST });
    });
  });

  describe('pokemonFailure', () => {
    it('should return default state', () => {
      const action = pokemonFailure('There is an error');
      expect(action).toEqual({ type: POKEMON_FAILURE, payload: 'There is an error' });
    });
  });

  describe('addAllPokemons', () => {
    it('should return default state', () => {
      const action = addAllPokemons('Pokemons');
      expect(action).toEqual({ type: ADD_ALL_POKEMONS, payload: 'Pokemons' });
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

  describe('updateSelectedPokemon', () => {
    it('should return default state', () => {
      const action = updateSelectedPokemon({ data: 'pokemon' });
      expect(action).toEqual({ type: UPDATE_SELECTED_POKEMON, payload: 'pokemon' });
    });
  });

  describe('axiosBlock', () => {
    it('should dispatch pokemonRequest action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons' }));
      store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPokemons, dispatch); });
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
      ]);
    });

    it('should dispatch given action when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons', status: 200 }));
      await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPokemons, dispatch); });
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'ADD_ALL_POKEMONS', payload: 'Pokemons' },
      ]);
    });

    it('should dispatch given action when response fails ', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Site Not Found', status: 404 }));
      await (await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPokemons, dispatch); }));
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'POKEMON_FAILURE', payload: 404 },
      ]);
    });

    it('should dispatch given action if there is an error when request is sent', async () => {
      axios.mockImplementationOnce(() => Promise.reject());
      await (await store.dispatch(dispatch => { axiosBlock('mockUrlAPI', addAllPokemons, dispatch); }));
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'POKEMON_FAILURE' },
      ]);
    });
  });

  describe('fetchPokemonsList', () => {
    it('should dispatch addAllPokemons when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons', status: 200 }));
      await store.dispatch(fetchPokemonsList());
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'ADD_ALL_POKEMONS', payload: 'Pokemons' },
      ]);
    });
  });

  describe('fetchPokemonsUpdate', () => {
    it('should dispatch updateFilter action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons' }));
      store.dispatch(fetchPokemonsUpdate({ filter: 'name', filterInput: 'Ivy' }));
      expect(store.getActions()).toEqual([
        {
          type: 'UPDATE_FILTER',
          payload: { filter: 'name', filterInput: 'Ivy' },
        },
        { type: 'POKEMON_REQUEST' },
      ]);
    });

    it('should dispatch addAllPokemons when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons', status: 200 }));
      await store.dispatch(fetchPokemonsUpdate({ filter: 'name', filterInput: 'Ivy' }));
      // console.warn(store.getActions());
      expect(store.getActions()).toEqual([
        {
          type: 'UPDATE_FILTER',
          payload: { filter: 'name', filterInput: 'Ivy' },
        },
        { type: 'POKEMON_REQUEST' },
        { type: 'ADD_ALL_POKEMONS', payload: 'Pokemons' },

      ]);
    });
  });
  describe('fetchPokemonsSearch', () => {
    it('should dispatch updateFilter action ', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons' }));
      store.dispatch(fetchPokemonsSearch({ searchInput: 'Ivy' }));
      expect(store.getActions()).toEqual([
        { type: 'UPDATE_SEARCH', payload: 'Ivy' },
        { type: 'POKEMON_REQUEST' },
      ]);
    });

    it('should dispatch addAllPokemons when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons', status: 200 }));
      await store.dispatch(fetchPokemonsSearch({ searchInput: 'Ivy' }));
      expect(store.getActions()).toEqual([
        { type: 'UPDATE_SEARCH', payload: 'Ivy' },
        { type: 'POKEMON_REQUEST' },
        { type: 'ADD_ALL_POKEMONS', payload: 'Pokemons' },
      ]);
    });
  });

  describe('openPokemonPage', () => {
    it('should dispatch addAllPokemons when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'Pokemons', status: 200 }));
      await store.dispatch(openPokemonPage('page=2'));
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'ADD_ALL_POKEMONS', payload: 'Pokemons' },
      ]);
    });
  });

  describe('fetchSelectedPokemon', () => {
    it('should dispatch updateSelectedPokemon when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: { data: 'Pokemons' }, status: 200 }));
      await store.dispatch(fetchSelectedPokemon(1993));
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        { type: 'UPDATE_SELECTED_POKEMON', payload: 'Pokemons' },
      ]);
    });
  });
});
