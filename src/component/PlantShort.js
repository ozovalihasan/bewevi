import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyImage from './EmptyImage';

const PlantShort = ({
  plant, handleClick, handleError,
}) => (
  <Link to="/one-plant" onClick={() => handleClick(plant.id)} className="plant-short main">
    <div className="plant-short description">
      <div>
        {plant.commonName || 'No common name'}
      </div>
      <div>
        {plant.scientificName}
      </div>
    </div>

    <div className="plant-short image-container">
      {plant.imageUrl
        ? <img src={`${plant.imageUrl}`} className="plant-short plant-image" alt="plant" onError={handleError} />
        : <EmptyImage className="plant-short plant-image" />}
    </div>
  </Link>
);

PlantShort.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    commonName: PropTypes.string,
    scientificName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,

};

export default PlantShort;
