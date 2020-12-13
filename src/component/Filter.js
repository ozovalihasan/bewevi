import PropTypes from 'prop-types';

const Filter = ({
  handleChangeFilter, plantProperties, handleChangeInput, handleClick, filterInput,
}) => (
  <>
    <select name="filter" onChange={handleChangeFilter}>
      {plantProperties.map(plantProperties => (
        <option key={plantProperties} value={plantProperties}>
          {plantProperties}
        </option>
      ))}
    </select>
    <input type="text" onChange={handleChangeInput} value={filterInput} />
    <button type="button" onClick={handleClick}>Filter Results</button>
  </>

);

Filter.propTypes = {
  handleChangeFilter: PropTypes.func.isRequired,
  plantProperties: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  filterInput: PropTypes.string.isRequired,

};

export default Filter;
