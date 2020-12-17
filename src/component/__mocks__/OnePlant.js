import PropTypes from 'prop-types';

const OnePlant = ({
  plant,
  handleError,
}) => (
  <>
    {JSON.stringify(plant)}
    <img src="#" alt="test" onError={handleError} />
  </>
);

OnePlant.propTypes = {
  plant: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
};

export default OnePlant;
