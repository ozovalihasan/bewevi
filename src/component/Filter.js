import PropTypes from 'prop-types';
// import filterIcon from '../assets/filter.svg';

const Filter = ({
  handleChangeCategory,
  handleFilterName,
  category,
  filterName,
  categoryNameList,
  categoryList,
}) => (
  <div className="filter main">
    <select className="filter filter-select-category" name="filter-category" onChange={handleChangeCategory} value={category}>
      <option defaultValue="none" selected>
        Filter By Category
      </option>
      {categoryNameList.map(oneCategory => (
        <option key={oneCategory[0]} value={oneCategory[1]}>
          {oneCategory[0]}
        </option>
      ))}
    </select>
    {categoryList !== {} && (
      <select className="filter filter-select-name" name="filter-name" onChange={handleFilterName} value={filterName}>
        <option defaultValue="none" selected>
          Filter Name
        </option>
        {categoryList.map(oneName => (
          <option key={oneName} value={oneName}>
            {oneName}
          </option>
        ))}
      </select>
    )}
  </div>

);

Filter.propTypes = {
  handleChangeCategory: PropTypes.func.isRequired,
  categoryNameList:
  PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  categoryList:
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
  handleFilterName: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Filter;
