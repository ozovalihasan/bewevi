import PropTypes from 'prop-types';
import PokemonShort from '../component/PokemonShort';
import emptyImageSVG from '../assets/emptyImage.svg';

const PokemonShortContainer = ({ pokemon }) => {
  const updatedPokemon = { id: pokemon.url.split(/pokemon\//i)[1].split(/\//)[0], name: pokemon.name };

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  return (
    <PokemonShort
      pokemon={updatedPokemon}
      handleError={handleError}
    />
  );
};

PokemonShortContainer.propTypes = {
  pokemon: PropTypes.shape().isRequired,
};

export default PokemonShortContainer;
