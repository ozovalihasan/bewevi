import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../component/Filter';
import {
  fetchCategoryName, fetchFilterName, updateFilterName, updateFilterPokemon,
} from '../redux';

const FilterContainer = () => {
  const categoryNameList = [
    ['Habitat', 'pokemon-habitat/'],
    ['Shape', 'pokemon-shape/'],
    ['Color', 'pokemon-color/'],
  ];

  const categoryList = useSelector(state => state.pokemon.filter.categoryList);
  const [category, setCategory] = useState(
    useSelector(state => state.pokemon.filter.categoryName),
  );
  const [filterName, setFilterName] = useState(
    useSelector(state => state.pokemon.filter.name),
  );

  const dispatch = useDispatch();

  const handleChangeCategory = e => {
    setCategory(e.target.value);
    dispatch(updateFilterName(e.target.value));
    if (e.target.value !== 'All') {
      dispatch(fetchCategoryName(e.target.value));
    } else {
      setFilterName('Filter Name');
      dispatch(updateFilterName('Filter Name'));
      dispatch(updateFilterPokemon([]));
    }
  };

  const handleFilterName = e => {
    setFilterName(e.target.value);
    dispatch(updateFilterName(e.target.value));
    if (e.target.value !== 'All') {
      dispatch(fetchFilterName(`${category}${e.target.value}`));
    } else {
      dispatch(updateFilterPokemon([]));
    }
  };

  return (
    <Filter
      handleChangeCategory={handleChangeCategory}
      handleFilterName={handleFilterName}
      category={category}
      filterName={filterName}
      categoryNameList={categoryNameList}
      categoryList={categoryList}
    />
  );
};

export default FilterContainer;