import { useSelector, useDispatch } from 'react-redux';
import PagesBar from '../component/PagesBar';

// import Pages from '../component/Pages';
import { openPokemonPage } from '../redux';

const PagesBarContainer = () => {
  const dispatch = useDispatch();
  const links = useSelector(state => state.pokemon.links);
  const pages = [];
  let limit = 0;
  let offset = 0;
  let dividePath = [];
  let addedSelf = false;
  let selfPage = '';

  if (links.previous) {
    limit = parseInt(links.next.split(/limit=/)[1].split(/&/)[0], 10);
    offset = parseInt(links.next.split(/offset=/)[1].split(/&/)[0], 10);
    dividePath = links.next.split(/offset=\d*/);
    pages.push([links.previous, 'Previous']);

    selfPage = `${dividePath[0]}offset=${offset - limit}`;
    pages.push([selfPage, offset / limit]);
    addedSelf = true;
  }

  if (links.next) {
    limit = parseInt(links.next.split(/limit=/)[1].split(/&/)[0], 10);
    offset = parseInt(links.next.split(/offset=/)[1].split(/&/)[0], 10);
    dividePath = links.next.split(/offset=\d*/);
    if (addedSelf === false) {
      selfPage = `${dividePath[0]}offset=${offset - limit}`;
      pages.push([selfPage, offset / limit]);
      addedSelf = true;
    }
    pages.push([links.next, 'next']);
  }

  // const limit = parseInt(links.next.split(/limit=/)[1].split(/&/)[0], 10);
  // const next = parseInt(links.last.split(/offset=/)[1].split(/&/)[0], 10);
  // const selfPage = parseInt(links.self.split(/page=/)[1]?.split(/&/)[0], 10) || 1;
  // const firstPage = parseInt(links.first.split(/page=/)[1].split(/&/)[0], 10);

  // const dividePath = links.last.split(/page=\d*/);
  const handleClick = pageUrl => {
    if (pageUrl !== selfPage) dispatch(openPokemonPage(pageUrl));
  };

  // if (links.previous) pages.push([selfPage - 1, 'Previous']);
  // pages.push([selfPage, selfPage]);
  // if (links.next) pages.push([selfPage + 1, 'Next']);

  return (
    <PagesBar pages={pages} handleClick={handleClick} selfPage={selfPage} />
  );
};

export default PagesBarContainer;
