import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonsList from '../component/PokemonsList';
import PagesBarContainer from './PagesBarContainer';
import { fetchPokemonsList } from '../redux';

const PokemonsListContainer = () => {
  const filteredPokemon = useSelector(state => state.pokemon.filter.filteredPokemon);
  const pokemons = useSelector(state => state.pokemon.pokemons).filter(
    pokemon => ((filteredPokemon.length === 0) || (filteredPokemon.includes(pokemon.name))),
  );

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
