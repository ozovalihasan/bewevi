import React, { useState } from 'react';
import ToggleFilterSearch from '../component/ToggleFilterSearch';
import FilterContainer from './FilterContainer';
import SearchContainer from './SearchContainer';

const ToggleFilterSearchContainer = () => {
  const [shownContainer, setShownContainer] = useState(<SearchContainer />);
  const handleClick = e => {
    if (e.target.textContent === 'Filter') {
      setShownContainer(<FilterContainer />);
      e.target.textContent = 'Search';
    } else {
      setShownContainer(<SearchContainer />);
      e.target.textContent = 'Filter';
    }
  };

  return (
    <ToggleFilterSearch handleClick={handleClick} shownContainer={shownContainer} />
  );
};

export default ToggleFilterSearchContainer;
