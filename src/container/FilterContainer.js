// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Filter from '../component/Filter';
// import { fetchPokemonsUpdate } from '../redux';

// const FilterContainer = () => {
//   const pokemonProperties = [
//     ['all', 'All'],
//     ['common_name', 'Common Name'],
//     ['year', 'Year'],
//     ['scientific_name', 'Scientific Name'],
//     ['family_common_name', 'Common Family Name'],
//     ['family', 'Family Name'],
//   ];
//   const [filterInput, setFilterInput] = useState(
//     useSelector(state => state.pokemon.filterInput),
//   );
//   const [filter, setFilter] = useState(
//     useSelector(state => state.pokemon.filter),
//   );
//   const dispatch = useDispatch();

//   const handleChangeFilter = e => {
//     setFilter(e.target.value);
//   };

//   const handleChangeInput = e => {
//     setFilterInput(e.target.value);
//   };

//   const handleClick = () => {
//     dispatch(fetchPokemonsUpdate({ filter, filterInput }));
//   };

//   return (
//     <Filter
//       handleChangeFilter={handleChangeFilter}
//       pokemonProperties={pokemonProperties}
//       handleChangeInput={handleChangeInput}
//       handleClick={handleClick}
//       filter={filter}
//       filterInput={filterInput}
//     />
//   );
// };

// export default FilterContainer;
