import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Loading from '../component/Loading';
import { fetchPokemonsList } from '../redux';
import ErrorContainer from './ErrorContainer';
import PokemonsListContainer from './PokemonsListContainer';
import Logo from '../component/Logo';
import OnePokemonContainer from './OnePokemonContainer';

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
      <Switch>
        <Route exact path="/" component={PokemonsListContainer} />
        <Route exact path="/one-pokemon/:id" component={OnePokemonContainer} />
      </Switch>
    </div>
  );
}

export default App;
