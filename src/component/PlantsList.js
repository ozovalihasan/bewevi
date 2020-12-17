import PropTypes from 'prop-types';
import PlantShortContainer from '../container/PlantShortContainer';

const PlantsList = ({ plants }) => (
  <div className="plants-list main">
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

PlantsList.propTypes = {
  plants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    common_name: PropTypes.string,
    scientific_name: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  })).isRequired,
};

export default PlantsList;
