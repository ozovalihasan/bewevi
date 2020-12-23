import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const initialState = {
  pokemon: {
    loading: false,
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

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
