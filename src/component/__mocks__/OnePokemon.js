import PropTypes from 'prop-types';

const OnePokemon = ({
  pokemon,
  handleError,
}) => (
  <>
    {JSON.stringify(pokemon)}
    <img src="#" alt="test" onError={handleError} />
  </>
);

OnePokemon.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
};

export default OnePokemon;
