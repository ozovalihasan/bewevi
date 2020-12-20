import PropTypes from 'prop-types';
import searchIcon from '../assets/search.svg';

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
      <img className="search search-icon" src={searchIcon} alt="Search icon to search" />
    </button>
  </div>

);

Search.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,

};

export default Search;
