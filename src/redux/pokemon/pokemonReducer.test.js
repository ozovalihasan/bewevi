import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  UPDATE_SELECTED_POKEMON,
  UPDATE_SPECIES_SELECTED_POKEMON,
  UPDATE_EVOLUTION_SELECTED_POKEMON,
  UPDATE_CATEGORY_LIST,
  UPDATE_FILTER_POKEMON,
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
      payload: { results: 'data of pokemons', next: 'Next page', previous: 'Previous Page' },
    });
    expect(state).toEqual({
      loading: false,
      pokemons: 'data of pokemons',
      links: {
        next: 'Next page',
        previous: 'Previous Page',
      },
      error: '',
    });
  });

  it('should return information of the selected pokemon ', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_SELECTED_POKEMON,
      payload: 'information of the chosen pokemon',
    });
    expect(state).toEqual({
      chosen: 'information of the chosen pokemon',
      error: '',
    });
  });

  it('should return color, habitat and shape of selected pokemon', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_SPECIES_SELECTED_POKEMON,
      payload: { color: { name: 'Color name' }, habitat: { name: 'Habitat name' }, shape: { name: 'Shape name' } },
    });
    expect(state).toEqual({
      color: 'Color name',
      error: '',
      habitat: 'Habitat name',
      shape: 'Shape name',
    });
  });

  it('should return evolution chain, habitat and shape of selected pokemon', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_EVOLUTION_SELECTED_POKEMON,
      payload: 'Evolution Chain',
    });
    expect(state).toEqual({
      error: '',
      evolutionChain: 'Evolution Chain',
      loading: false,
    });
  });

  it('should return list of given category', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_CATEGORY_LIST,
      payload: ['ball', 'fish'],
    });
    expect(state).toEqual(
      {
        error: '',
        filter: {
          categoryList: ['ball', 'fish'],
        },
        loading: false,
      },
    );
  });

  it('should update filtered pokemon list', () => {
    const state = pokemonReducer(undefined, {
      type: UPDATE_FILTER_POKEMON,
      payload: ['ivysaur', 'venusaur'],
    });
    expect(state).toEqual(
      {
        error: '',
        filter: {
          filteredPokemon: ['ivysaur', 'venusaur'],
        },
        loading: false,
      },
    );
  });
});
