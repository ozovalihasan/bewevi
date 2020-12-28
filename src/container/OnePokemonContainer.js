import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import OnePokemon from '../component/OnePokemon';
import emptyImageSVG from '../assets/emptyImage.svg';
import { fetchSelectedPokemon } from '../redux';

const OnePokemonContainer = ({ match }) => {
  const dispatch = useDispatch();
  const storedPokemon = useSelector(state => state.pokemon.chosen);
  const selectedPokemon = match.params.id;
  useEffect(() => {
    dispatch(fetchSelectedPokemon(selectedPokemon));
  }, [selectedPokemon]);
  const {
    color, habitat, shape, evolutionChain,
  } = useSelector(state => state.pokemon);

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  return (
    <>
      <OnePokemon
        pokemon={storedPokemon}
        handleError={handleError}
        color={color}
        habitat={habitat}
        shape={shape}
        evolutionChain={evolutionChain}
      />
    </>
  );
};

OnePokemonContainer.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default OnePokemonContainer;
