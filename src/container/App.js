import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { fetchPlantsList } from '../redux';
import PagesContainer from './PagesContainer';
import PlantListContainer from './PlantsListContainer';
// import SearchContainer from './SearchContainer';
import ToggleFilterSearchContainer from './ToggleFilterSearchContainer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.plant.initialized);
  const loading = useSelector(state => state.plant.loading);
  console.log(initialized, loading);
  if (!initialized) {
    if (!loading) dispatch(fetchPlantsList());
    return (
      <div>
        {loading && <Loading />}
      </div>
    );
  }

  return (
    <div className="App">
      {loading && <Loading />}
      <ToggleFilterSearchContainer />
      <PlantListContainer />
      <PagesContainer />

    </div>
  );
}

export default App;
