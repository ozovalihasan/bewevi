import {
  PLANT_REQUEST,
  PLANT_FAILURE,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_PLANT,
} from './plantTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case PLANT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_ALL_PLANTS:
      return {
        ...state,
        initialized: true,
        loading: false,
        plants: action.payload.data,
        links: action.payload.links,
        error: '',
      };

    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
        filterInput: action.payload.filterInput,
        error: '',
      };

    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
        error: '',
      };

    case UPDATE_SELECTED_PLANT:
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
