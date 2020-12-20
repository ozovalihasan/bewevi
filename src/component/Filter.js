import PropTypes from 'prop-types';
import filterIcon from '../assets/filter.svg';

const Filter = ({
  handleChangeFilter, plantProperties, handleChangeInput, handleClick, filterInput,
}) => (
  <div className="filter main">
    <select className="filter filter-select" name="filter" onChange={handleChangeFilter}>
      {plantProperties.map(plantProperties => (
        <option key={plantProperties[0]} value={plantProperties[0]}>
          {plantProperties[1]}
        </option>
      ))}
    </select>
    <input
      className="filter filter-input"
      type="text"
      onChange={handleChangeInput}
      value={filterInput}
      placeholder="Filter"
    />
    <button className="filter filter-button" type="button" onClick={handleClick}>
      <img className="filter filter-icon" src={filterIcon} alt="Filter results" />
    </button>
  </div>

);

Filter.propTypes = {
  handleChangeFilter: PropTypes.func.isRequired,
  plantProperties:
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  filterInput: PropTypes.string.isRequired,

};

export default Filter;
