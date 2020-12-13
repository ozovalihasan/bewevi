import axios from 'axios';
import {
  PLANT_REQUEST,
  PLANT_FAILURE,
  PLANT_SUCCESS,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
} from './plantTypes';

export const plantRequest = () => ({
  type: PLANT_REQUEST,
});

export const plantSuccess = user => ({
  type: PLANT_SUCCESS,
  payload: user,
});

export const plantFailure = error => ({
  type: PLANT_FAILURE,
  payload: error,
});

export const addAllPlants = plants => ({
  type: ADD_ALL_PLANTS,
  payload: plants,
});

export const updateFilter = ({ filter, filterInput }) => ({
  type: UPDATE_FILTER,
  payload: { filter, filterInput },
});

export const updateSearch = ({ search }) => ({
  type: UPDATE_SEARCH,
  payload: { search },
});

export const fetchPlantsList = () => dispatch => {
  dispatch(plantRequest());
  axios(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      dispatch(addAllPlants(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};

export const fetchPlantsUpdate = ({ filter, filterInput }) => dispatch => {
  dispatch(plantRequest());
  dispatch(updateFilter({ filter, filterInput }));
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=${process.env.REACT_APP_API_KEY}&filter[${filter}]=${encodeURI(filterInput)}`;
  axios(urlAPI)
    .then(response => {
      console.log(response);
      dispatch(addAllPlants(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};

export const fetchPlantsSearch = searchInput => dispatch => {
  dispatch(plantRequest());
  dispatch(updateSearch(searchInput));
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=${process.env.REACT_APP_API_KEY}&q=${searchInput}`;
  axios(urlAPI)
    .then(response => {
      dispatch(addAllPlants(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};

export const openPlantPage = pagePath => dispatch => {
  dispatch(plantRequest());
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io${pagePath}&token=${process.env.REACT_APP_API_KEY}`;
  axios(urlAPI)
    .then(response => {
      dispatch(addAllPlants(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};
