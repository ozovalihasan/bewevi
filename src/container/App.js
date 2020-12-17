import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { fetchPlantsList } from '../redux';
import PagesBarContainer from './PagesBarContainer';
import PlantsListContainer from './PlantsListContainer';
// import SearchContainer from './SearchContainer';
import ToggleFilterSearchContainer from './ToggleFilterSearchContainer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.plant.initialized);
  const loading = useSelector(state => state.plant.loading);
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
      <PlantsListContainer />
      <PagesBarContainer />

    </div>
  );
}

export default App;
