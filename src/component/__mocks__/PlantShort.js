import PropTypes from 'prop-types';

const PlantShort = ({
  plant,
  handleClick,
  handleError,
}) => (
  <>
    {JSON.stringify(plant)}
    <img src="#" alt="test" onError={handleError} />
    <button type="button" onClick={() => handleClick(plant.id)}>
      test
    </button>
  </>
);

PlantShort.propTypes = {
  plant: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PlantShort;
