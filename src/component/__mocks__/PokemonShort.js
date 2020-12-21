import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PokemonShort = ({
  pokemon,
  handleClick,
  handleError,
}) => (
  <>
    {JSON.stringify(pokemon)}
    <img src="#" alt="test" onError={handleError} />
    <Link to="/one-pokemon" onClick={() => handleClick(pokemon.id)}>
      test
    </Link>

  </>
);

PokemonShort.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PokemonShort;
