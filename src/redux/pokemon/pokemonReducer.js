import {
  POKEMON_REQUEST,
  POKEMON_FAILURE,
  ADD_ALL_POKEMONS,
  UPDATE_SELECTED_POKEMON,
  UPDATE_SPECIES_SELECTED_POKEMON,
  UPDATE_EVOLUTION_SELECTED_POKEMON,
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
        loading: false,
        error: action.payload,
      };

    case ADD_ALL_POKEMONS:
      return {
        ...state,
        loading: false,
        pokemons: action.payload.results,
        links: {
          next: action.payload.next,
          previous: action.payload.previous,
        },
        error: '',
      };

    case UPDATE_SELECTED_POKEMON:
      return {
        ...state,
        chosen: action.payload,
        error: '',
      };

    case UPDATE_SPECIES_SELECTED_POKEMON:
      return {
        ...state,
        color: action.payload.color.name,
        habitat: action.payload.habitat.name,
        shape: action.payload.shape.name,
        error: '',
      };

    case UPDATE_EVOLUTION_SELECTED_POKEMON:
      return {
        ...state,
        loading: false,
        evolutionChain: action.payload,
        error: '',
      };

    default:
      return state;
  }
};

export default reducer;
