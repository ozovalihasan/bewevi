import { combineReducers } from 'redux';
import pokemonReducer from './pokemon/pokemonReducer2';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
