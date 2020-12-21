import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { fetchPlantsList } from '../redux';
import ErrorContainer from './ErrorContainer';
import PagesBarContainer from './PagesBarContainer';
import PlantsListContainer from './PlantsListContainer';
import ToggleFilterSearchContainer from './ToggleFilterSearchContainer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.plant.initialized);
  const loading = useSelector(state => state.plant.loading);
  const error = useSelector(state => state.plant.error);

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
      {error && <ErrorContainer />}
      <PlantsListContainer />
      <PagesBarContainer />
    </div>
  );
}

export default App;
