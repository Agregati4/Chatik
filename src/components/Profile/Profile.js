import * as React from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import '../App/App.css';
import Header from '../Header/Header';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import api from '../../utils/Api';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [ profileInfo, setProfileInfo ] = React.useState({});
  const [ friendList, setFriendList ] = React.useState([]);
  const [ isPageReady, setIsPageReady ] = React.useState(false);
  const [ editProfilePopup, setEditProfilePopup ] = React.useState({ isOpen: false });
  const [ confirmPopup, setConfirmPopup ] = React.useState({ isOpen: false });
  const [ nextFriends, setNextFriends ] = React.useState('');
  const [ hasMoreFriends, setHasMoreFriends ] = React.useState(true);
  const { userId } = useParams();

  React.useEffect(() => {
    Promise.all([ api.getUserInfo(userId), api.getUserFriends(userId) ])
    .then(([profileInfo, friendList]) => {
      setProfileInfo(profileInfo);
      setFriendList(friendList.results);

      if (friendList.next) {
        setNextFriends(friendList.next);
      } else {
        setHasMoreFriends(false);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsPageReady(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userId, localStorage.getItem('access') ]);

  function handleUpdateUser(data) {
    api.updateCurrentUser(data)
    .then((newUserInfo) => {
      setEditProfilePopup(state => {
        return { ...state, isOpen: false }
      });
      props.setCurrentUser(state => {
        return { ...state, username: newUserInfo.username, status: newUserInfo.status };
      })
      props.handleNotification(true);
    })
    .catch(() => {
      setEditProfilePopup(state => {
        return { ...state, isOpen: false }
      });
      props.handleNotification(false);
    })
  }

  function handleCloseConfirmPopup() {
    setConfirmPopup(state => {
      return { ...state, isOpen: false };
    })
  }

  function handleDeleteFriend(friendToDelete) {
    api.deleteFriend([friendToDelete])
    .then(() => {
      handleCloseConfirmPopup();
      setFriendList(state => state.filter(friend => friend.id !== friendToDelete));
      props.handleNotification(true);
    })
    .catch(() => {
      props.handleNotification(false);
    })
  }

  function getMoreFriends() {
    api.getMoreFriends(nextFriends)
    .then((friendsData) => {
      setFriendList(state => state.concat(friendsData.result));
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Header />
      <EditProfilePopup editProfilePopup={ editProfilePopup } setEditProfilePopup={ setEditProfilePopup } handleUpdateUser={ handleUpdateUser } />
      <ConfirmPopup confirmPopup={ confirmPopup } handleClose={ handleCloseConfirmPopup } handleDeleteFriend={ handleDeleteFriend } />
      <main className="content">
        <ProfileContainer
          setPicturePopup={ props.setPicturePopup }
          handleProfilePhotoChange={ props.handleProfilePhotoChange }
          setEditProfilePopup={ setEditProfilePopup }
          // eslint-disable-next-line eqeqeq
          profileInfo={ userId == currentUser.id ? currentUser : profileInfo }
          handleSignOut={ props.handleSignOut }
          userId={ userId }
          isPageReady={ isPageReady }
          friendList={ friendList }
          setIsPageReady={ setIsPageReady }
          setConfirmPopup={ setConfirmPopup }
          hasMoreFriends={ hasMoreFriends }
          getMoreFriends={ getMoreFriends }
        />
      </main>
    </>
  );
}

export default Profile;