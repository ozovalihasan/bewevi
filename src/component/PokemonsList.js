import PropTypes from 'prop-types';
import PokemonShortContainer from '../container/PokemonShortContainer';

const PokemonsList = ({ pokemons, filteredPokemon }) => (
  <div className="pokemons-list main">
    {pokemons
      .filter(
        pokemon => ((filteredPokemon.length === 0) || (filteredPokemon.includes(pokemon.name))),
      )
      .map(pokemon => (
        <PokemonShortContainer
          key={pokemon.name}
          pokemon={pokemon}
        />
      ))}
  </div>
);

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filteredPokemon: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonsList;
