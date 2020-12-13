import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlantsList } from '../redux';
import FilterContainer from './FilterContainer';
import PagesContainer from './PagesContainer';
import PlantListContainer from './PlantsListContainer';
import SearchContainer from './SearchContainer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.plant.initialized);
  if (!initialized) dispatch(fetchPlantsList());

  return (
    <div>
      <div className="App">

        <PlantListContainer />

        <FilterContainer />
        <SearchContainer />
        <PagesContainer />
      </div>
    </div>
  );
}

export default App;
