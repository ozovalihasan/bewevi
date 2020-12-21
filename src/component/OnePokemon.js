import PropTypes from 'prop-types';
import Logo from './Logo';
// import EmptyImage from './EmptyImage';

const OnePokemon = ({
  pokemon, handleError,
}) => (
  <div className="one-pokemon main">
    <div className="one-pokemon logo">
      <Logo />
    </div>
    <div className="one-pokemon top-part">

      <div className="one-pokemon main-image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt="pokemon"
          onError={handleError}
          className="one-pokemon top-images"
        />
      </div>
      <div className="one-pokemon top-description">
        <div>
          Name:
          {' '}
          {pokemon.name}
        </div>

        {pokemon.weight && (
          <div>
            Weight:
            {' '}
            {pokemon.height * 0.1}
            kg
          </div>
        )}

        {pokemon.height && (
          <div>
            Height:
            {' '}
            {pokemon.height * 10}
            cm
          </div>
        )}
      </div>
    </div>
    <div className="one-pokemon bottom-part">
      <div className="one-pokemon one-property">
        <div>
          Fruit
        </div>

      </div>

      <div className="one-pokemon one-property">
        <div>
          Leaf
        </div>

      </div>
      <div className="one-pokemon one-property">
        <div>
          Flower
        </div>

      </div>
    </div>

  </div>

);

OnePokemon.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
};

export default OnePokemon;
