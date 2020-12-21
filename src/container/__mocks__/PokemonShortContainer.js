import React from 'react';
import PropTypes from 'prop-types';

const PokemonShortContainer = ({ pokemon }) => (
  <>
    {JSON.stringify(pokemon)}
  </>
);

PokemonShortContainer.propTypes = {
  pokemon: PropTypes.shape().isRequired,
};

export default PokemonShortContainer;
