import PropTypes from 'prop-types';

const OnePlant = ({
  plant, onError, emptyImage,
}) => {
  console.log(plant);
  return (
    <div className="one-plant main">
      <div className="one-plant top-part">

        <div className="one-plant main-image">
          {plant.image_url
            ? <img src={plant.image_url} alt="plant" width="100" onError={onError} className="one-plant top-images" />
            : emptyImage('one-plant top-images')}
        </div>
        <div>

          <div>
            Year:
            {plant.year}
          </div>
          <div>
            Common Name:
            {plant.common_name}
          </div>
          <div>
            Scientific Name
            {plant.scientific_name}
          </div>
          <div>
            Common Family Name
            {plant.family_common_name}
          </div>
          <div>
            Family Name
            {plant.family}
          </div>
        </div>
      </div>
      <div className="one-plant bottom-part">
        <div>
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

        <div>
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
        <div>
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
};

OnePlant.propTypes = {
  plant: PropTypes.shape().isRequired,
  onError: PropTypes.func.isRequired,
  emptyImage: PropTypes.shape().isRequired,
};

export default OnePlant;
