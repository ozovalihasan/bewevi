import { useSelector, useDispatch } from 'react-redux';

// import Pages from '../component/Pages';
import { openPlantPage } from '../redux';

const PagesContainer = () => {
  const dispatch = useDispatch();
  const links = useSelector(state => state.plant.links);

  const lastPage = parseInt(links.last.split(/page=/)[1].split(/&/)[0], 10);
  const selfPage = parseInt(links.self.split(/page=/)[1]?.split(/&/)[0], 10) || 1;
  // const selfPath = links.self.split(/page=/)[0];
  const firstPage = parseInt(links.first.split(/page=/)[1].split(/&/)[0], 10);

  const dividePath = links.last.split(/page=\d*/);
  const handleClick = pageNumber => {
    if (pageNumber !== selfPage) dispatch(openPlantPage(`${dividePath[0]}page=${pageNumber}${dividePath[1]}`));
  };

  const pages = [];
  if (selfPage > firstPage) pages.push([selfPage - 1, 'previous']);
  pages.push([selfPage, selfPage]);
  if (selfPage < lastPage) pages.push([selfPage + 1, 'Next']);

  return (
    <>
      {pages.map(page => (
        <button type="button" key={`${dividePath[0]}page=${page[0]}${dividePath[1]}`} onClick={() => handleClick(page[0])} className={selfPage === page[0] ? 'orange' : ''}>
          {page[1]}
        </button>
      ))}
    </>
  );
};

export default PagesContainer;
