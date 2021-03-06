import { Link } from 'react-router-dom';
import logo from '../assets/emptyImage.svg';

const Logo = () => (
  <Link to="/" className="logo main">
    <img className="logo image" src={logo} alt="logo" />
    <div className="logo text">
      Bewevi
    </div>
  </Link>
);

export default Logo;
