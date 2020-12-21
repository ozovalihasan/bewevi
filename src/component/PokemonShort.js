import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PokemonShort = ({
  pokemon, handleClick, handleError,
}) => (
  <Link to="/one-pokemon" onClick={() => handleClick(pokemon.id)} className="pokemon-short main">
    <div className="pokemon-short description">
      <div>
        {pokemon.name || 'No Name'}
      </div>
    </div>

    <div className="pokemon-short image-container">
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} className="pokemon-short pokemon-image" alt="pokemon" onError={handleError} />
    </div>
  </Link>
);

PokemonShort.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,

};

export default PokemonShort;
