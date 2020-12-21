import React from 'react';
import { useSelector } from 'react-redux';
import OnePokemon from '../component/OnePokemon';
import emptyImageSVG from '../assets/emptyImage.svg';
import Loading from '../component/Loading';

const OnePokemonContainer = () => {
  const pokemon = useSelector(state => state.pokemon.chosen);
  const loading = useSelector(state => state.pokemon.loading);

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };
  console.warn(pokemon);
  return (
    <>
      {loading && <Loading />}
      {pokemon.id ? (
        <OnePokemon
          pokemon={pokemon}
          handleError={handleError}
        />
      ) : (
        <div />
      )}
    </>
  );
};

export default OnePokemonContainer;
