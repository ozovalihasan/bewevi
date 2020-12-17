import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import PlantShort from '../component/PlantShort';
import { fetchSelectedPlant } from '../redux';
import emptyImageSVG from '../assets/emptyImage.svg';

const PlantShortContainer = ({ plant }) => {
  const dispatch = useDispatch();

  const handleClick = plantId => {
    dispatch(fetchSelectedPlant(plantId));
    return true;
  };

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  return (
    <PlantShort
      plant={plant}
      handleClick={handleClick}
      handleError={handleError}
    />
  );
};

PlantShortContainer.propTypes = {
  plant: PropTypes.shape().isRequired,
};

export default PlantShortContainer;
