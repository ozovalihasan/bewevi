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
  payload: plant,
});

export const fetchPlantsList = () => dispatch => {
  dispatch(plantRequest());
  axios(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species?token=${process.env.REACT_APP_API_KEY}`)
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
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species?token=${process.env.REACT_APP_API_KEY}&filter[${filter}]=${encodeURI(filterInput)}`;
  axios(urlAPI)
    .then(response => {
      dispatch(addAllPlants(response.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};

export const fetchPlantsSearch = ({ searchInput }) => dispatch => {
  dispatch(plantRequest());
  dispatch(updateSearch({ searchInput }));
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species/search?token=${process.env.REACT_APP_API_KEY}&q=${searchInput}&limit=12`;
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

export const fetchSelectedPlant = plantId => dispatch => {
  dispatch(plantRequest());
  const urlAPI = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species/${plantId}?token=${process.env.REACT_APP_API_KEY}`;
  axios(urlAPI)
    .then(response => {
      dispatch(updateSelectedPlant(response.data.data));
    })
    .catch(error => {
      dispatch(plantFailure(error));
    });
};
