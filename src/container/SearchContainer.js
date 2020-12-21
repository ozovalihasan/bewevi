// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Search from '../component/Search';
// import { fetchPokemonsSearch } from '../redux';

// const SearchContainer = () => {
//   const saved = useSelector(state => state.pokemon.search);
//   const [searchInput, setSearchInput] = useState(saved);
//   const dispatch = useDispatch();

//   const handleChangeInput = e => {
//     setSearchInput(e.target.value);
//   };

//   const handleClick = () => {
//     dispatch(fetchPokemonsSearch({ searchInput }));
//   };

//   return (
//     <Search
//       key={saved}
//       handleChangeInput={handleChangeInput}
//       handleClick={handleClick}
//       searchInput={searchInput}
//     />
//   );
// };

// export default SearchContainer;
