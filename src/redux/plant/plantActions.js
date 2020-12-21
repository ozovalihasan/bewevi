import axios from 'axios';
import {
  PLANT_REQUEST,
  PLANT_FAILURE,
  ADD_ALL_PLANTS,
  UPDATE_FILTER,
  UPDATE_SEARCH,
  UPDATE_SELECTED_PLANT,
} from './plantTypes';

export const plantRequest = () => ({
  type: PLANT_REQUEST,
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

export const updateSearch = ({ searchInput }) => ({
  type: UPDATE_SEARCH,
  payload: searchInput,
});
export const updateSelectedPlant = plant => ({
  type: UPDATE_SELECTED_PLANT,
  payload: plant.data,
});

export const axiosBlock = (urlAPI, usedDispatch, dispatch) => {
  dispatch(plantRequest());
  axios(urlAPI)
    .then(response => {
      if (response.status.toString()[0] !== '2') {
        throw response.status;
      }
      dispatch(usedDispatch(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};

const REACT_APP_SERVER_URL = 'https://cors-anywhere.herokuapp.com/https://treafle.io';

export const fetchPlantsList = () => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}/api/v1/species?token=${process.env.REACT_APP_API_KEY}`;
  axiosBlock(urlAPI, addAllPlants, dispatch);
};

export const fetchPlantsUpdate = ({ filter, filterInput }) => dispatch => {
  dispatch(updateFilter({ filter, filterInput }));
  const urlAPI = `${REACT_APP_SERVER_URL}/api/v1/species?token=${process.env.REACT_APP_API_KEY}&filter[${filter}]=${encodeURI(filterInput)}`;
  axiosBlock(urlAPI, addAllPlants, dispatch);
};

export const fetchPlantsSearch = ({ searchInput }) => dispatch => {
  dispatch(updateSearch({ searchInput }));
  const urlAPI = `${REACT_APP_SERVER_URL}/api/v1/species/search?token=${process.env.REACT_APP_API_KEY}&q=${searchInput}&limit=12`;
  axiosBlock(urlAPI, addAllPlants, dispatch);
};

export const openPlantPage = pagePath => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}${pagePath}&token=${process.env.REACT_APP_API_KEY}`;
  axiosBlock(urlAPI, addAllPlants, dispatch);
};

export const fetchSelectedPlant = plantId => dispatch => {
  const urlAPI = `${REACT_APP_SERVER_URL}/api/v1/species/${plantId}?token=${process.env.REACT_APP_API_KEY}`;
  axiosBlock(urlAPI, updateSelectedPlant, dispatch);
};
