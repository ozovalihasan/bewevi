import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { fetchPlantsList } from '../redux';
import FilterContainer from './FilterContainer';
import PagesContainer from './PagesContainer';
import PlantListContainer from './PlantsListContainer';
import SearchContainer from './SearchContainer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.plant.initialized);
  const loading = useSelector(state => state.plant.loading);
  if (!initialized) dispatch(fetchPlantsList());

  return (
    <div className="App">
      {loading && <Loading />}
      <SearchContainer />
      <PlantListContainer />
      <PagesContainer />
      <FilterContainer />

    </div>
  );
}

export default App;
