import { useNavigate } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img src={ logo } onClick={ () => navigate('/') } className="logo" alt="Логотип" />
      <Navigation />
    </header>
  );
}

export default Header;