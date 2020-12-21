import PropTypes from 'prop-types';

function PagesBar({
  pages, selfPage, handleClick,
}) {
  return (
    <div className="pages-bar main">
      {pages.map(page => (
        <button
          type="button"
          key={page[0]}
          onClick={() => handleClick(page[0])}
          className={`pages-bar page-button ${selfPage === page[0] ? 'current-page' : ''}`}
        >
          {page[1]}
        </button>
      ))}
    </div>
  );
}
PagesBar.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    ).isRequired,
  ).isRequired,
  selfPage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,

};
export default PagesBar;
