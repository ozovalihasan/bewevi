import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PlantShort = ({
  plant, handleClick, handleError, emptyImage,
}) => (
  <Link to="/one-plant" onClick={() => handleClick(plant.id)} className="plant-short main">
    <div className="plant-short description">
      <div>
        {plant.commonName || 'No common name'}
      </div>
      <div>
        {plant.scientific_name}
      </div>
    </div>

    <div className="plant-short image-container">
      {plant.imageUrl ? <img src={`${plant.imageUrl}`} className="plant-short plant-image" alt="plant" onError={handleError} /> : emptyImage('plant-short plant-image')}
    </div>
  </Link>
);

PlantShort.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    commonName: PropTypes.string.isRequired,
    scientific_name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  emptyImage: PropTypes.func.isRequired,

};

export default PlantShort;
