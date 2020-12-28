/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    loading: false,
    filter: {
      categoryList: [],
      filteredPokemon: [],
    },
    color: '',
    habitat: '',
    shape: '',
    evolutionChain: [],
    pokemons: [],
    chosen: {},
    links: {
      next: '',
      previous: '',
    },
    error: '',
  },
  reducers: {

    pokemonRequest: state => {
      state.loading = true;
    },

    pokemonFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    addAllPokemons: (state, { payload }) => {
      state.loading = false;
      state.pokemons = payload.results;
      state.links.next = payload.next;
      state.links.previous = payload.previous;
      state.error = '';
    },

    updateSelectedPokemon: (state, { payload }) => {
      state.chosen = payload;
      state.error = '';
    },

    updateSpeciesSelectedPokemon: (state, { payload }) => {
      state.color = payload.color.name;
      state.habitat = payload.habitat.name;
      state.shape = payload.shape.name;
      state.error = '';
    },

    updateEvolutionSelectedPokemon: {
      reducer: (state, { payload }) => {
        state.loading = false;
        state.evolutionChain = payload;
        state.error = '';
      },
      prepare: evolution => {
        const evolutionChain = JSON.stringify(evolution)
          .split(/pokemon-species\//)
          .slice(1);
        return {
          payload:
            evolutionChain
              .map(pokemon => pokemon.split(/\//)[0])
              .reverse(),
        };
      },
    },

    updateCategoryList: {
      reducer: (state, { payload }) => {
        state.loading = false;
        state.filter.categoryList = payload;
        state.error = '';
      },
      prepare: categoryList => ({
        payload:
          categoryList.results.map(
            category => category.name,
          ),
      }),
    },

    updateFilterPokemon: {
      reducer: (state, { payload }) => {
        state.loading = false;
        state.filter.filteredPokemon = payload;
        state.error = '';
      },
      prepare: filteredPokemon => ({
        payload:
          filteredPokemon.pokemon_species.map(
            pokemon => pokemon.name,
          ),

      }),
    },

  },

});

const { actions, reducer } = pokemonSlice;

export const {
  pokemonRequest,
  pokemonFailure,
  addAllPokemons,
  updateSelectedPokemon,
  updateSpeciesSelectedPokemon,
  updateEvolutionSelectedPokemon,
  updateCategoryList,
  updateFilterPokemon,
} = actions;

export const axiosBlock = (urlAPI, usedDispatch, dispatch) => {
  dispatch(pokemonRequest());
  axios(urlAPI)
    .then(response => {
      if (response.status.toString()[0] !== '2') {
        throw response.status;
      }
      dispatch(usedDispatch(response.data));
    })
    .catch(error => {
      dispatch(pokemonFailure(error));
    });
};

const REACT_APP_SERVER_URL = 'https://pokeapi.co/api/v2/';

export const fetchPokemonsList = () => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}pokemon/`;
  axiosBlock(urlAPI, addAllPokemons, dispatch);
};

export const openPokemonPage = pagePath => dispatch => {
  const urlAPI = pagePath;
  axiosBlock(urlAPI, addAllPokemons, dispatch);
};

export const fetchEvolutionPokemon = species => dispatch => {
  dispatch(updateSpeciesSelectedPokemon(species));
  const urlAPI = species.evolution_chain.url;
  axiosBlock(urlAPI, updateEvolutionSelectedPokemon, dispatch);
};

export const fetchSpeciesPokemon = pokemon => dispatch => {
  dispatch(updateSelectedPokemon(pokemon));
  const urlAPI = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;
  axiosBlock(urlAPI, fetchEvolutionPokemon, dispatch);
};

export const fetchSelectedPokemon = pokemonId => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}pokemon/${pokemonId}`;
  axiosBlock(urlAPI, fetchSpeciesPokemon, dispatch);
};

export const fetchCategoryName = category => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}${category}`;
  axiosBlock(urlAPI, updateCategoryList, dispatch);
};

export const fetchFilterName = filterName => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}${filterName}`;
  axiosBlock(urlAPI, updateFilterPokemon, dispatch);
};

export default reducer;
