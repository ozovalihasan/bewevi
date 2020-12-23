import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonsList from '../component/PokemonsList';
import PagesBarContainer from './PagesBarContainer';
import { fetchPokemonsList } from '../redux';

const PokemonsListContainer = () => {
  const pokemons = useSelector(state => state.pokemon.pokemons);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonsList());
  }, []);

  return (
    <>
      <PokemonsList pokemons={pokemons} />
      <PagesBarContainer />
    </>

  );
};

export default PokemonsListContainer;
