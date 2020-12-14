import PropTypes from 'prop-types';

const Search = ({
  handleChangeInput, handleClick, searchInput,
}) => (
  <div className="search main">
    <input
      className="search search-input"
      type="text"
      onChange={handleChangeInput}
      placeholder="Search"
      value={searchInput}
    />
    <button
      className="search search-button"
      type="button"
      onClick={handleClick}
    >
      Search
    </button>
  </div>

);

Search.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,

};

export default Search;
