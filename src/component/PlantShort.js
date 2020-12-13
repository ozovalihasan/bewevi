import PropTypes from 'prop-types';

const PlantShort = ({ plant }) => (
  <div>
    {plant.commonName}
    {plant.slug}

    <img src={`${plant.imageUrl}`} alt="plant" width="100" height="100" />
  </div>
);

PlantShort.propTypes = {
  plant: PropTypes.shape({
    commonName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlantShort;
