import React from 'react';
import PropTypes from 'prop-types';

const PokemonsList = ({ pokemons }) => (
  <>
    <div>
      {JSON.stringify(pokemons)}
    </div>
  </>
);

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PokemonsList;
