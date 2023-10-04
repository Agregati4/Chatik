import * as React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../Contexts/CurrentUserContext';

function Navigation() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      <Link to={ `/friends/${ currentUser.id }` } className="navigation__link">Друзья</Link>
      <Link to={ `/profile/${ currentUser.id }` } className="navigation__link">Профиль</Link>
    </nav>
  );
}

export default Navigation;