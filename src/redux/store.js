import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const initialState = {
  plant: {
    loading: false,
    initialized: false,
    filter: 'All',
    filterInput: '',
    search: '',
    plants: [],
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
