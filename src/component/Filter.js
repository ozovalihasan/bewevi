import PropTypes from 'prop-types';
// import filterIcon from '../assets/filter.svg';
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
      <option defaultValue="none" disabled hidden>
        Filter By Category
      </option>
      <option defaultValue="none">
        All
      </option>
      {categoryNameList.map(oneCategory => (
        <option key={oneCategory[0]} value={oneCategory[1]}>
          {oneCategory[0]}
        </option>
      ))}
    </select>
    {category !== 'Filter By Category' && category !== 'All' && (
      <select className="filter filter-select-name" name="filter-name" onChange={handleFilterName} value={filterName}>
        <option defaultValue="none" disabled hidden>
          Filter Name
        </option>
        <option defaultValue="none">
          All
        </option>
        {categoryList.map(oneName => (
          <option key={oneName} value={oneName}>
            {oneName.charAt(0).toUpperCase() + oneName.slice(1)}
          </option>
        ))}
      </select>
    )}
    <div className="filter filter-close-box" />

  </div>

);

Filter.propTypes = {
  handleChangeCategory: PropTypes.func.isRequired,
  categoryList:
    PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  categoryNameList:
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
