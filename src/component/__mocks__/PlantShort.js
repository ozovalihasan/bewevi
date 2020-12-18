import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PlantShort = ({
  plant,
  handleClick,
  handleError,
}) => (
  <>
    {JSON.stringify(plant)}
    <img src="#" alt="test" onError={handleError} />
    <Link to="/one-plant" onClick={() => handleClick(plant.id)}>
      test
    </Link>

  </>
);

PlantShort.propTypes = {
  plant: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PlantShort;
