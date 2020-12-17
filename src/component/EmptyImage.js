import emptyImageSVG from '../assets/emptyImage.svg';

const EmptyImage = ({ className = '' }) => (
  <img src={emptyImageSVG} alt="Not provided" className={className} />
);
export default EmptyImage;
