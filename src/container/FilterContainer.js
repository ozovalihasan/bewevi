import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../component/Filter';
import { fetchPlantsUpdate } from '../redux';

const FilterContainer = () => {
  const plantProperties = ['common_name', 'complete_data', 'family'];
  const [filterInput, setFilterInput] = useState(useSelector(state => state.plant.filterInput));
  const [filter, setFilter] = useState(plantProperties[0]);

  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleChangeInput = e => {
    setFilterInput(e.target.value);
  };

  const handleClick = () => {
    dispatch(fetchPlantsUpdate({ filter, filterInput }));
  };
  return (
    <Filter
      handleChangeFilter={handleChangeFilter}
      plantProperties={plantProperties}
      handleChangeInput={handleChangeInput}
      handleClick={handleClick}
      filterInput={filterInput}
    />
  );
};

export default FilterContainer;
