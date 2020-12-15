import React from 'react';
import PropTypes from 'prop-types';

const PlantShortContainer = ({ plant }) => (
  <>
    {JSON.stringify(plant)}
  </>
);

PlantShortContainer.propTypes = {
  plant: PropTypes.shape().isRequired,
};

export default PlantShortContainer;
