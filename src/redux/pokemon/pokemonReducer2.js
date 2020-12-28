import { createSlice } from '@reduxjs/toolkit';

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
      prepare: res => ({
        payload: res,
      }),
    },

    updateSelectedPokemon: {
      reducer: (state, action) => {
        state.push({
          chosen: action.payload,
          error: '',
        });
      },
      prepare: pokemon => ({
        payload: pokemon,
      }),
    },

    updateSpeciesSelectedPokemon: {
      reducer: (state, action) => {
        state.push({
          color: action.payload.color.name,
          habitat: action.payload.habitat.name,
          shape: action.payload.shape.name,
          error: '',
        });
      },
      prepare: species => ({
        payload: species,
      }),
    },

    updateEvolutionSelectedPokemon: {
      reducer: (state, action) => {
        state.push({
          loading: false,
          evolutionChain: action.payload,
          error: '',
        });
      },
      prepare: evolution => {
        const evolutionChain = JSON.stringify(evolution)
          .split(/pokemon-species\//)
          .slice(1);
        const evolutionPokemon = evolutionChain
          .map(pokemon => pokemon.split(/\//)[0])
          .reverse();
        return {
          payload: evolutionPokemon,
        };
      },
    },

    updateCategoryList: {
      reducer: (state, action) => {
        state.push({
          loading: false,
          filter: {
            ...state.filter,
            categoryList: action.payload,
          },
          error: '',
        });
      },
      prepare: categoryList => {
        const categoryListResults = categoryList.results.map(
          category => category.name,
        );
        return {
          payload: categoryListResults,
        };
      },
    },

    updateFilterPokemon: {
      reducer: (state, action) => {
        state.push({
          ...state,
          loading: false,
          filter: {
            ...state.filter,
            filteredPokemon: action.payload,
          },
          error: '',
        });
      },
      prepare: filteredPokemon => {
        let filteredPokemonList;
        if (filteredPokemon.length !== 0) {
          filteredPokemonList = filteredPokemon.pokemon_species.map(
            pokemon => pokemon.name,
          );
        } else {
          filteredPokemonList = filteredPokemon;
        }
        return {
          payload: filteredPokemonList,
        };
      },
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
export default reducer;
