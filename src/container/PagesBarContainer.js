import { useSelector, useDispatch } from 'react-redux';
import PagesBar from '../component/PagesBar';

// import Pages from '../component/Pages';
import { openPlantPage } from '../redux';

const PagesBarContainer = () => {
  const dispatch = useDispatch();
  const links = useSelector(state => state.plant.links);

  const lastPage = parseInt(links.last.split(/page=/)[1].split(/&/)[0], 10);
  const selfPage = parseInt(links.self.split(/page=/)[1]?.split(/&/)[0], 10) || 1;
  const firstPage = parseInt(links.first.split(/page=/)[1].split(/&/)[0], 10);

  const dividePath = links.last.split(/page=\d*/);
  const handleClick = pageNumber => {
    if (pageNumber !== selfPage) dispatch(openPlantPage(`${dividePath[0]}page=${pageNumber}${dividePath[1]}`));
  };

  const pages = [];
  if (selfPage > firstPage) pages.push([selfPage - 1, 'Previous']);
  pages.push([selfPage, selfPage]);
  if (selfPage < lastPage) pages.push([selfPage + 1, 'Next']);

  return (
    <PagesBar pages={pages} handleClick={handleClick} selfPage={selfPage} />
  );
};

export default PagesBarContainer;
