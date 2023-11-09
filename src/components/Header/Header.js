import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={ `header ${ location.pathname === '/signin' || location.pathname === '/signup' ? "display-none" : "" }` }>
      <img src={ logo } onClick={ () => navigate('/') } className="logo" alt="Логотип" />
      <Navigation />
    </header>
  );
}

export default Header;