import React from 'react';
import { useSelector } from 'react-redux';
import OnePlant from '../component/OnePlant';
import emptyImageSVG from '../assets/emptyImage.svg';
import Loading from '../component/Loading';

const OnePlantContainer = () => {
  const plant = useSelector(state => state.plant.chosen);
  const loading = useSelector(state => state.plant.loading);

  const handleError = e => {
    e.target.src = emptyImageSVG;
  };

  return (
    <>
      {loading && <Loading />}
      {plant.images ? (
        <OnePlant
          plant={plant}
          handleError={handleError}
        />
      ) : (
        <div />
      )}
    </>
  );
};

export default OnePlantContainer;
