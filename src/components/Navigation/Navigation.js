import './Navigation.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navigation() {
  const { currentUser } = useSelector(state => state.currentUser);
  const { requests } = useSelector(state => state.requests);

  return (
    <nav className="navigation">
      <Link to={ `/requests/${ currentUser.id }`} className={ `navigation__link ${ requests.length < 1 ? "display-none" : "" }` }>
        <div className="navigation__bell-image"></div>
        <div className="navigation__requests-length">{ requests.length }</div>
      </Link>
      <Link to={ `/friends/${ currentUser.id }` } className="navigation__link">Друзья</Link>
      <Link to={ `/profile/${ currentUser.id }` } className="navigation__link">Профиль</Link>
    </nav>
  );
}

export default Navigation;