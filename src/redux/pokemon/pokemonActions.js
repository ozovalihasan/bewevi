import axios from 'axios';
import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  // UPDATE_FILTER,
  // UPDATE_SEARCH,
  UPDATE_SELECTED_POKEMON,
} from './pokemonTypes';

export const pokemonRequest = () => ({
  type: POKEMON_REQUEST,
});

export const pokemonFailure = error => ({
  type: POKEMON_FAILURE,
  payload: error,
});

export const addAllPokemons = res => ({
  type: ADD_ALL_POKEMONS,
  payload: res,
});

// export const updateFilter = ({ filter, filterInput }) => ({
//   type: UPDATE_FILTER,
//   payload: { filter, filterInput },
// });

// export const updateSearch = ({ searchInput }) => ({
//   type: UPDATE_SEARCH,
//   payload: searchInput,
// });

export const updateSelectedPokemon = pokemon => ({
  type: UPDATE_SELECTED_POKEMON,
  payload: pokemon,
});

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

const REACT_APP_SERVER_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonsList = () => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}`;
  axiosBlock(urlAPI, addAllPokemons, dispatch);
};

// export const fetchPokemonsUpdate = ({ filter, filterInput }) => dispatch => {
//   dispatch(updateFilter({ filter, filterInput }));
// const urlAPI =
// `${REACT_APP_SERVER_URL}/api/v1/species?&filter[${filter}]=${encodeURI(filterInput)}`;
//   axiosBlock(urlAPI, addAllPokemons, dispatch);
// };

// export const fetchPokemonsSearch = ({ searchInput }) => dispatch => {
//   dispatch(updateSearch({ searchInput }));
//   const urlAPI = `${REACT_APP_SERVER_URL}/api/v1/species/search?&q=${searchInput}&limit=12`;
//   axiosBlock(urlAPI, addAllPokemons, dispatch);
// };

export const openPokemonPage = pagePath => dispatch => {
  const urlAPI = pagePath;
  axiosBlock(urlAPI, addAllPokemons, dispatch);
};

export const fetchSelectedPokemon = pokemonId => dispatch => {
  const urlAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  axiosBlock(urlAPI, updateSelectedPokemon, dispatch);
};
