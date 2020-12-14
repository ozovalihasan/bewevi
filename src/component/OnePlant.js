import PropTypes from 'prop-types';
import Logo from './Logo';

const OnePlant = ({
  plant, onError, emptyImage,
}) => (
  <div className="one-plant main">
    <div className="one-plant logo">
      <Logo />
    </div>
    <div className="one-plant top-part">

      <div className="one-plant main-image">
        {plant.image_url
          ? (
            <img
              src={plant.image_url}
              alt="plant"
              width="100"
              onError={onError}
              className="one-plant top-images"
            />
          )
          : emptyImage('one-plant top-images')}
      </div>
      <div className="one-plant top-description">

        <div className="one-plant description-part">
          Year:
          {'  '}
          {plant.year}
        </div>
        <div className="one-plant description-part">
          Common Name:
          {'  '}
          {plant.common_name || 'No common name'}
        </div>
        <div className="one-plant description-part">
          Scientific Name:
          {'  '}
          {plant.scientific_name || 'No scientific name'}
        </div>
        <div className="one-plant description-part">
          Common Family Name:
          {'  '}
          {plant.family_common_name || 'No common family name'}
        </div>
        <div className="one-plant description-part">
          Family Name:
          {'  '}
          {plant.family || 'No family name'}
        </div>
      </div>
    </div>
    <div className="one-plant bottom-part">
      <div className="one-plant one-property">
        <div>
          Fruit
        </div>
        {plant.images.fruit[0] ? (
          <img
            src={plant.images.fruit[0].image_url}
            alt={`fruit of ${plant.common_name}`}
            onError={onError}
            className="one-plant bottom-images"
          />
        ) : emptyImage('one-plant bottom-images')}
      </div>

      <div className="one-plant one-property">
        <div>
          Leaf
        </div>
        {plant.images.leaf[0] ? (
          <img
            className="one-plant bottom-images"
            src={plant.images.leaf[0].image_url}
            alt={`Leaf of ${plant.common_name}`}
            onError={onError}
          />
        ) : emptyImage('one-plant bottom-images')}
      </div>
      <div className="one-plant one-property">
        <div>
          Flower
        </div>
        {plant.images.flower[0] ? (
          <img
            className="one-plant bottom-images"
            src={plant.images.flower[0].image_url}
            alt={`Leaf of ${plant.common_name}`}
            onError={onError}
          />
        ) : emptyImage('one-plant bottom-images')}
      </div>
    </div>

  </div>

);

OnePlant.propTypes = {
  plant: PropTypes.shape().isRequired,
  onError: PropTypes.func.isRequired,
  emptyImage: PropTypes.shape().isRequired,
};

export default OnePlant;
