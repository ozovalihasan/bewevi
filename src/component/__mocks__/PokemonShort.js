import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PokemonShort = ({
  pokemon,
  handleError,
}) => (
  <>
    {JSON.stringify(pokemon)}
    <img src="#" alt="test" onError={handleError} />
    <Link to={`/one-pokemon/${pokemon.id}`}>
      test
    </Link>

  </>
);

PokemonShort.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
};

export default PokemonShort;
