import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../component/Search';
import { fetchPlantsSearch } from '../redux';

const SearchContainer = () => {
  const [searchInput, setSearchInput] = useState(useSelector(state => state.plant.search));

  const dispatch = useDispatch();

  const handleChangeInput = e => {
    setSearchInput(e.target.value);
  };

  const handleClick = () => {
    dispatch(fetchPlantsSearch(searchInput));
  };
  return (
    <Search
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      searchInput={searchInput}
    />
  );
};

export default SearchContainer;
