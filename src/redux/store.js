// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

// import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const initialState = {
  pokemon: {
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
    links: {},
    error: '',
  },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
});

export default store;
