import './FriendsContainer.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import Preloader from '../Preloader/Preloader';
import FriendsField from '../FriendsField/FriendsField';

function FriendsContainer(props) {
  return (
    <section className="friends-container">
      {
        props.isPageReady ?
        <>
          <ChatMenu
            searchForm={ true }
            inputPlaceholder="Поиск друзей"
            handleSearchSubmit={ props.handleSearchSubmit }
            setFriendsText={ props.setFriendsText }
          />
          <FriendsField
            handleSearchSubmit={ props.handleSearchSubmit }
            shownUsers={ props.shownUsers }
            friendsText={ props.friendsText }
            setFriendsText={ props.setFriendsText }
          />
        </> :
        <>
          <ChatMenu
            searchForm={ true }
            inputPlaceholder="Поиск друзей"
            handleSearchSubmit={ props.handleSearchSubmit }
            setFriendsText={ props.setFriendsText }
          />
          <Preloader />
        </>
      }
    </section>
  );
}

export default FriendsContainer;