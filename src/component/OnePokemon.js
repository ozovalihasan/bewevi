import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const OnePokemon = ({
  pokemon, handleError, color, habitat, shape, evolutionChain,
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
          className={`one-pokemon top-images ${color}`}
        />
      </div>
      <div className="one-pokemon top-description">
        <div className="one-pokemon description-part">
          Name:
          {' '}
          {pokemon.name}
        </div>
        <div className="one-pokemon description-part">
          Habitat:
          {' '}
          {habitat}
        </div>
        <div className="one-pokemon description-part">
          Shape:
          {' '}
          {shape}
        </div>

        {pokemon.weight && (
          <div className="one-pokemon description-part">
            Weight:
            {' '}
            {pokemon.height * 0.1}
            kg
          </div>
        )}

        {pokemon.height && (
          <div className="one-pokemon description-part">
            Height:
            {' '}
            {pokemon.height * 10}
            cm
          </div>
        )}
      </div>
    </div>
    <div className="one-pokemon bottom-part">
      Evolution Chain
      <div className="one-pokemon bottom-images">
        {evolutionChain.map(pokemonId => (
          <div key={pokemonId} className="one-pokemon one-chain ">
            <Link to={`/one-pokemon/${pokemonId}`} className="one-pokemon main">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`} alt="Pokemon in evolution chain of the selected pokemon" className="one-pokemon bottom-images" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>

);

OnePokemon.propTypes = {
  pokemon: PropTypes.shape().isRequired,
  handleError: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  habitat: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
  evolutionChain: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OnePokemon;
