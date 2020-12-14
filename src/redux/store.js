import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';
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
  // filter: {
  //   filter: 'All',
  //   filterInput: '',
  // },

};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
