import PropTypes from 'prop-types';

function PagesBar({
  pages, dividePath, handleClick, selfPage,
}) {
  return (
    <div className="pages-bar main">
      {pages.map(page => (
        <button
          type="button"
          key={`${dividePath[0]}page=${page[0]}${dividePath[1]}`}
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
  pages: PropTypes.arrayOf().isRequired,
  dividePath: PropTypes.arrayOf().isRequired,
  handleClick: PropTypes.func.isRequired,
  selfPage: PropTypes.number.isRequired,

};
export default PagesBar;
