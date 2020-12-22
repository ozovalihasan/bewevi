import { useSelector, useDispatch } from 'react-redux';
import PagesBar from '../component/PagesBar';

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

  const handleClick = pageUrl => {
    if (pageUrl !== selfPage) dispatch(openPokemonPage(pageUrl));
  };

  return (
    <PagesBar pages={pages} handleClick={handleClick} selfPage={selfPage} />
  );
};

export default PagesBarContainer;
