import PropTypes from 'prop-types';
import PokemonShortContainer from '../container/PokemonShortContainer';

const PokemonsList = ({ pokemons }) => {
  console.warn(pokemons);
  return (
    <div className="pokemons-list main">
      {pokemons.map(pokemon => (
        <PokemonShortContainer
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>

  );
};

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PokemonsList;
