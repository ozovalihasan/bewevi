import PropTypes from 'prop-types';
import PlantShortContainer from '../container/PlantShortContainer';

const PlantList = ({ plants }) => (
  <div className="plant-list main">
    {plants.map(plant => (
      <PlantShortContainer
        key={plant.id}
        plant={{
          id: plant.id,
          commonName: plant.common_name,
          scientificName: plant.scientific_name,
          imageUrl: plant.image_url,
        }}
      />
    ))}
  </div>

);

PlantList.propTypes = {
  plants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    common_name: PropTypes.string.isRequired,
    scientificName: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  })).isRequired,
};

export default PlantList;
