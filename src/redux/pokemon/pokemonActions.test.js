import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  UPDATE_SELECTED_POKEMON,
  UPDATE_SPECIES_SELECTED_POKEMON,
  UPDATE_EVOLUTION_SELECTED_POKEMON,
} from './pokemonTypes';

import {
  pokemonRequest,
  pokemonFailure,
  addAllPokemons,
  updateSelectedPokemon,
  updateSpeciesSelectedPokemon,
  updateEvolutionSelectedPokemon,
  axiosBlock,
  fetchPokemonsList,
  openPokemonPage,
  fetchEvolutionPokemon,
  fetchSpeciesPokemon,
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
    it('should return POKEMON_REQUEST type', () => {
      const action = pokemonRequest();
      expect(action).toEqual({ type: POKEMON_REQUEST });
    });
  });

  describe('pokemonFailure', () => {
    it('should return POKEMON_FAILURE type with payload', () => {
      const action = pokemonFailure('There is an error');
      expect(action).toEqual({ type: POKEMON_FAILURE, payload: 'There is an error' });
    });
  });

  describe('addAllPokemons', () => {
    it('should return ADD_ALL_POKEMONS type with payload', () => {
      const action = addAllPokemons('Pokemons');
      expect(action).toEqual({ type: ADD_ALL_POKEMONS, payload: 'Pokemons' });
    });
  });

  describe('updateSelectedPokemon', () => {
    it('should return UPDATE_SELECTED_POKEMON type with payload', () => {
      const action = updateSelectedPokemon('pokemon');
      expect(action).toEqual({ type: UPDATE_SELECTED_POKEMON, payload: 'pokemon' });
    });
  });

  describe('updateSpeciesSelectedPokemon', () => {
    it('should return UPDATE_SPECIES_SELECTED_POKEMON type with payload', () => {
      const action = updateSpeciesSelectedPokemon('pokemon');
      expect(action).toEqual({ type: UPDATE_SPECIES_SELECTED_POKEMON, payload: 'pokemon' });
    });
  });

  describe('updateEvolutionSelectedPokemon', () => {
    it('should return UPDATE_EVOLUTION_SELECTED_POKEMON type with payload', () => {
      const action = updateEvolutionSelectedPokemon({
        chain: {
          evolves_to: [
            {
              evolves_to: [
                {
                  species: {
                    url: 'https://pokeapi.co/api/v2/pokemon-species/12/',
                  },
                },
              ],
              species: {
                url: 'https://pokeapi.co/api/v2/pokemon-species/11/',
              },
            },
          ],
          species: {
            url: 'https://pokeapi.co/api/v2/pokemon-species/10/',
          },
        },
        id: 4,
      });
      expect(action).toEqual({ type: UPDATE_EVOLUTION_SELECTED_POKEMON, payload: ['10', '11', '12'] });
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

  describe('fetchEvolutionPokemon', () => {
    it('should dispatch updateEvolutionSelectedPokemon when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({
        data: {
          chain: {
            evolves_to: [
              {
                evolves_to: [
                  {
                    species: {
                      url: 'https://pokeapi.co/api/v2/pokemon-species/12/',
                    },
                  },
                ],
                species: {
                  url: 'https://pokeapi.co/api/v2/pokemon-species/11/',
                },
              },
            ],
            species: {
              url: 'https://pokeapi.co/api/v2/pokemon-species/10/',
            },
          },
          id: 4,
        },
        status: 200,
      }));
      const species = { evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/4/' } };
      await store.dispatch(fetchEvolutionPokemon(species));
      expect(store.getActions()).toEqual([{
        payload: {
          evolution_chain:
            {
              url: 'https://pokeapi.co/api/v2/evolution-chain/4/',
            },
        },
        type: 'UPDATE_SPECIES_SELECTED_POKEMON',
      },
      {
        type: 'POKEMON_REQUEST',
      },
      {
        payload: ['10', '11', '12'],
        type: 'UPDATE_EVOLUTION_SELECTED_POKEMON',
      }]);
    });
  });
  describe('fetchSpeciesPokemon', () => {
    it('should dispatch updateSpeciesSelectedPokemon when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: { id: '1' }, status: 200 }));
      await store.dispatch(fetchSpeciesPokemon('100'));
      expect(store.getActions()).toEqual([
        {
          payload: '100',
          type: 'UPDATE_SELECTED_POKEMON',
        },
        {
          type: 'POKEMON_REQUEST',
        },
        {
          payload: {
            id: '1',
          },
          type: 'UPDATE_SPECIES_SELECTED_POKEMON',
        },
      ]);
    });
  });

  describe('fetchSelectedPokemon', () => {
    it('should dispatch updateSelectedPokemon when response is successful', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: { id: '1' }, status: 200 }));
      await store.dispatch(fetchSelectedPokemon('100'));
      expect(store.getActions()).toEqual([
        { type: 'POKEMON_REQUEST' },
        {
          payload: {
            id: '1',
          },
          type: 'UPDATE_SELECTED_POKEMON',
        },
        {
          type: 'POKEMON_REQUEST',
        },

      ]);
    });
  });
});
