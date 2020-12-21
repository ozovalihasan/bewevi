import { useSelector } from 'react-redux';
import PokemonsList from '../component/PokemonsList';

const PokemonsListContainer = () => {
  const pokemons = useSelector(state => state.pokemon.pokemons);
  return (
    <PokemonsList pokemons={pokemons} />
  );
};

export default PokemonsListContainer;
