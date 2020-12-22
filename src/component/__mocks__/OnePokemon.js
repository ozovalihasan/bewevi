import PropTypes from 'prop-types';

const OnePokemon = ({
  pokemon,
  handleError,
  color,
  habitat,
  shape,
  evolutionChain,
}) => (
  <>
    {JSON.stringify(pokemon)}
    {color}
    {habitat}
    {shape}
    {JSON.stringify(evolutionChain)}
    <img src="#" alt="test" onError={handleError} />
  </>
);

OnePokemon.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  habitat: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
  evolutionChain: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OnePokemon;
