import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import PokemonShort from '../component/PokemonShort';
import { fetchSelectedPokemon } from '../redux';
import emptyImageSVG from '../assets/emptyImage.svg';

const PokemonShortContainer = ({ pokemon }) => {
  const updatedPokemon = { id: pokemon.url.split(/pokemon\//i)[1].split(/\//)[0], name: pokemon.name };
  const dispatch = useDispatch();
  const handleClick = pokemonId => {
    dispatch(fetchSelectedPokemon(pokemonId));
    return true;
  };

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  return (
    <PokemonShort
      pokemon={updatedPokemon}
      handleClick={handleClick}
      handleError={handleError}
    />
  );
};

PokemonShortContainer.propTypes = {
  pokemon: PropTypes.shape().isRequired,
};

export default PokemonShortContainer;
