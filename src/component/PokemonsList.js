import PropTypes from 'prop-types';
import PokemonShortContainer from '../container/PokemonShortContainer';

const PokemonsList = ({ pokemons }) => (
  <div className="pokemons-list main">
    {pokemons.map(pokemon => (
      <PokemonShortContainer
        key={pokemon.name}
        pokemon={pokemon}
      />
    ))}
  </div>

);

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PokemonsList;
