import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import OnePokemon from '../component/OnePokemon';
import emptyImageSVG from '../assets/emptyImage.svg';
import Loading from '../component/Loading';
import { fetchSelectedPokemon } from '../redux';

const OnePokemonContainer = ({ match }) => {
  const dispatch = useDispatch();
  const storedPokemon = useSelector(state => state.pokemon.chosen);
  const selectedPokemon = match.params.id;
  const {
    color, habitat, shape, evolutionChain, loading,
  } = useSelector(state => state.pokemon);

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  if (loading === false) {
    if (storedPokemon.id) {
      storedPokemon.id = storedPokemon.id.toString();
      if (storedPokemon.id !== selectedPokemon) {
        dispatch(fetchSelectedPokemon(selectedPokemon));
      } else {
        return (
          <>
            {storedPokemon.id ? (
              <OnePokemon
                pokemon={storedPokemon}
                handleError={handleError}
                color={color}
                habitat={habitat}
                shape={shape}
                evolutionChain={evolutionChain}
              />
            ) : (
              <div />
            )}
          </>
        );
      }
    } else {
      dispatch(fetchSelectedPokemon(selectedPokemon));
    }
  }
  return (<Loading />);
};

OnePokemonContainer.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default OnePokemonContainer;
