import { combineReducers } from 'redux';
import plantReducer from './plant/plantReducer';
// import filterReducer from './filter/filterReducer';

const rootReducer = combineReducers({
  plant: plantReducer,
  // filter: filterReducer,
});

export default rootReducer;
