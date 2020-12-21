import PropTypes from 'prop-types';
import filterIcon from '../assets/filter.svg';

const Filter = ({
  handleChangeFilter, pokemonProperties, handleChangeInput, handleClick, filter, filterInput,
}) => (
  <div className="filter main">
    <select className="filter filter-select" name="filter" onChange={handleChangeFilter} value={filter}>
      {pokemonProperties.map(pokemonProperties => (
        <option key={pokemonProperties[0]} value={pokemonProperties[0]}>
          {pokemonProperties[1]}
        </option>
      ))}
    </select>
    {filter !== 'all' && (
      <input
        className="filter filter-input"
        type="text"
        onChange={handleChangeInput}
        value={filterInput}
        placeholder="Filter"
      />

    )}
    <button className="filter filter-button" type="button" onClick={handleClick}>
      {filterInput !== '' && filter !== 'All' && (
        <img className="filter filter-icon" src={filterIcon} alt="Filter results" />
      )}
    </button>
  </div>

);

Filter.propTypes = {
  handleChangeFilter: PropTypes.func.isRequired,
  pokemonProperties:
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  filterInput: PropTypes.string.isRequired,

};

export default Filter;
