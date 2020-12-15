import PropTypes from 'prop-types';

function PagesBar({
  pages, handleClick, selfPage,
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
  handleClick: PropTypes.func.isRequired,
  selfPage: PropTypes.number.isRequired,

};
export default PagesBar;
