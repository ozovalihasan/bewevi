import PropTypes from 'prop-types';

const Filter = ({
  handleChangeFilter, plantProperties, handleChangeInput, handleClick, filterInput,
}) => (
  <div className="filter main">
    <select name="filter" onChange={handleChangeFilter}>
      {plantProperties.map(plantProperties => (
        <option key={plantProperties[0]} value={plantProperties[0]}>
          {plantProperties[1]}
        </option>
      ))}
    </select>
    <input type="text" onChange={handleChangeInput} value={filterInput} />
    <button type="button" onClick={handleClick}>Filter Results</button>
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
