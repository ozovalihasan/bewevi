import { combineReducers } from 'redux';
import plantReducer from './plant/plantReducer';

const rootReducer = combineReducers({
  plant: plantReducer,
});

export default rootReducer;
