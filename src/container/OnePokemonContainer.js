import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import OnePokemon from '../component/OnePokemon';
import emptyImageSVG from '../assets/emptyImage.svg';
import Loading from '../component/Loading';
import { fetchSelectedPokemon } from '../redux';

const OnePokemonContainer = ({ match }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.pokemon.loading);
  const storedPokemon = useSelector(state => state.pokemon.chosen);
  const selectedPokemon = match.params.id;
  const evolutionChain = useSelector(state => state.pokemon.evolutionChain);
  const color = useSelector(state => state.pokemon.color);
  const habitat = useSelector(state => state.pokemon.habitat);
  const shape = useSelector(state => state.pokemon.shape);
  if (loading === false) {
    if (storedPokemon.id) {
      storedPokemon.id = storedPokemon.id.toString();
    } else {
      dispatch(fetchSelectedPokemon(selectedPokemon));
    }
    if (storedPokemon.id !== selectedPokemon) {
      dispatch(fetchSelectedPokemon(selectedPokemon));
    } else {
      const handleError = e => {
        e.target.src = emptyImageSVG;
      };

      if (loading) {
        return (
          <Loading />
        );
      }
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
  }
  return (<div />);
};

OnePokemonContainer.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default OnePokemonContainer;
