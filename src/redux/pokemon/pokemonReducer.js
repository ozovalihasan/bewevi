import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  // UPDATE_FILTER,
  // UPDATE_SEARCH,
  UPDATE_SELECTED_POKEMON,
} from './pokemonTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POKEMON_FAILURE:
      return {
        ...state,
        initialized: true,
        loading: false,
        error: action.payload,
      };

    case ADD_ALL_POKEMONS:
      return {
        ...state,
        initialized: true,
        loading: false,
        pokemons: action.payload.results,
        links: {
          next: action.payload.next,
          previous: action.payload.previous,
        },
        error: '',
      };

      // case UPDATE_FILTER:
      //   return {
      //     ...state,
      //     filter: action.payload.filter,
      //     filterInput: action.payload.filterInput,
      //     error: '',
      //   };

      // case UPDATE_SEARCH:
      //   return {
      //     ...state,
      //     search: action.payload,
      //     error: '',
      //   };

    case UPDATE_SELECTED_POKEMON:
      return {
        ...state,
        loading: false,
        chosen: action.payload,
        error: '',
      };

    default:
      return state;
  }
};

export default reducer;
