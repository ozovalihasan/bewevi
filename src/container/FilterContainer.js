import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../component/Filter';
import { fetchPlantsUpdate } from '../redux';

const FilterContainer = () => {
  const plantProperties = [
    ['All', 'All'],
    ['common_name', 'Common Name'],
    ['year', 'Year'],
    ['scientific_name', 'Scientific Name'],
    ['family_common_name', 'Common Family Name'],
    ['family', 'Family Name'],
  ];
  const [filterInput, setFilterInput] = useState(
    useSelector(state => state.plant.filterInput),
  );
  const [filter, setFilter] = useState(plantProperties[0][0]);
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
      filter={filter}
      filterInput={filterInput}
    />
  );
};

export default FilterContainer;
