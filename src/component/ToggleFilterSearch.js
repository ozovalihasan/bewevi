import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';

const ToggleFilterSearch = ({ handleClick, shownContainer }) => (
  <div className="toggle-filter-search main">
    <Logo />
    {shownContainer}
    <button type="button" onClick={handleClick} className="toggle-filter-search toggle-button">
      Filter
    </button>

  </div>
);

ToggleFilterSearch.propTypes = {
  handleClick: PropTypes.func.isRequired,
  shownContainer: PropTypes.shape().isRequired,
};

export default ToggleFilterSearch;
