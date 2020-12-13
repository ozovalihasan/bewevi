import PropTypes from 'prop-types';
import PlantShort from '../component/PlantShort';

const PlantShortContainer = ({ plant }) => (
  <PlantShort plant={plant} />
);

PlantShortContainer.propTypes = {
  plant: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    commonName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlantShortContainer;
