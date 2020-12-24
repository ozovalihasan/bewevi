import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonsList from '../component/PokemonsList';
import PagesBarContainer from './PagesBarContainer';
import { fetchPokemonsList } from '../redux';

const PokemonsListContainer = () => {
  const pokemons = useSelector(state => state.pokemon.pokemons);
  const filteredPokemon = useSelector(state => state.pokemon.filter.filteredPokemon);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonsList());
  }, []);

  return (
    <>
      <PokemonsList pokemons={pokemons} filteredPokemon={filteredPokemon} />
      <PagesBarContainer />
    </>

  );
};

export default PokemonsListContainer;
