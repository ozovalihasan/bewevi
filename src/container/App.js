import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { fetchPokemonsList } from '../redux';
import ErrorContainer from './ErrorContainer';
import PagesBarContainer from './PagesBarContainer';
import PokemonsListContainer from './PokemonsListContainer';
import Logo from '../component/Logo';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(state => state.pokemon.initialized);
  const loading = useSelector(state => state.pokemon.loading);
  const error = useSelector(state => state.pokemon.error);

  if (!initialized) {
    if (!loading) dispatch(fetchPokemonsList());
    return (
      <div>
        {loading && <Loading />}
      </div>
    );
  }

  return (
    <div className="App">
      <Logo />
      {loading && <Loading />}
      {error && <ErrorContainer />}
      <PokemonsListContainer />
      <PagesBarContainer />
    </div>
  );
}

export default App;
