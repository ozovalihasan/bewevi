import { useSelector } from 'react-redux';
import PokemonsList from '../component/PokemonsList';
import PagesBarContainer from './PagesBarContainer';

const PokemonsListContainer = () => {
  const pokemons = useSelector(state => state.pokemon.pokemons);
  return (
    <>
      <PokemonsList pokemons={pokemons} />
      <PagesBarContainer />
    </>

  );
};

export default PokemonsListContainer;
