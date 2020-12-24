import React from 'react';
import PropTypes from 'prop-types';

const PokemonsList = ({ pokemons, filteredPokemon }) => (
  <>
    <div>
      {JSON.stringify(pokemons)}
    </div>
    <div>
      {JSON.stringify(filteredPokemon)}
    </div>
  </>
);

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filteredPokemon: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonsList;
