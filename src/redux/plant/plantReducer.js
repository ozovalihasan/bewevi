import {
  PLANT_REQUEST,
  PLANT_SUCCESS,
  PLANT_FAILURE,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
} from './plantTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case PLANT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLANT_SUCCESS:
      return {
        ...state,
        loading: false,
        plants: action.payload.username,
        error: '',
      };

    case PLANT_FAILURE:
      return {
        ...state,
        loading: false,
        plants: '',
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
        loading: false,
        filter: action.payload.filter,
        filterInput: action.payload.filterInput,
        error: '',
      };

    case UPDATE_SEARCH:
      return {
        ...state,
        loading: false,
        search: action.payload,
        error: '',
      };

    default:
      return state;
  }
};

export default reducer;
