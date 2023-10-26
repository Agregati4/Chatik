import { useParams } from 'react-router-dom';
import './Profile.css';
import '../App/App.css';
import Header from '../Header/Header';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import api from '../../utils/Api';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { useUpdateCurrentUserMutation } from '../../store/Api/api.Slice';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';
import { useEffect, useState } from 'react';
import PicturePopup from '../PicturePopup/PicturePopup';
import ChangePhotoPopup from '../SelectPhotoPopup/SelectPhotoPopup';
import ConfirmPhotoPopup from '../ConfirmPhotoPopup/ConfirmPhotoPopup';
import HandleNotification from '../../customFunctions/HandleNotification';
import Notification from '../Notification/Notification';

function Profile(props) {
  const { currentUser } = useSelector(state => state.currentUser);
  const [ profileInfo, setProfileInfo ] = useState({});
  const [ friendList, setFriendList ] = useState([]);
  const [ isPageReady, setIsPageReady ] = useState(false);
  const [ confirmPopup, setConfirmPopup ] = useState({ isOpen: false });
  const [ nextFriends, setNextFriends ] = useState('');
  const [ hasMoreFriends, setHasMoreFriends ] = useState(true);
  const { userId } = useParams();
  const [ updateCurrentUser ] = useUpdateCurrentUserMutation();
  const { currentUserSetted, isLoggedInSetted } = useActions();
  const { popupClosed } = useActions();
  const { handleNotification } = HandleNotification();

  useEffect(() => {
    if (currentUser.id !== userId) {
      loadRegularUserProfile();
    } else {
      loadCurrentUserProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userId, localStorage.getItem('access') ]);

  function loadCurrentUserProfile() {
    api.getUserFriends(userId)
    .then((friendList) => {
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
  }

  function loadRegularUserProfile() {
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
  }

  function handleSignOut() {
    localStorage.clear();
    isLoggedInSetted(false);
  }

  function handleUpdateUser(data) {
    updateCurrentUser({ data: data, avatar: false })
    .unwrap()
    .then((newUserData) => {
      popupClosed('editProfilePopup');
      currentUserSetted(newUserData);
      handleNotification(true);
    })
    .catch(() => {
      popupClosed('editProfilePopup');
      handleNotification(false);
    })
  }

  function handleDeleteFriend(friendToDelete) {
    api.deleteFriend([friendToDelete])
    .then(() => {
      popupClosed('confirmPopup');
      setFriendList(state => state.filter(friend => friend.id !== friendToDelete));
      handleNotification(true);
    })
    .catch(() => {
      handleNotification(false);
    })
  }

  function getMoreFriends() {
    api.getMoreFriends(nextFriends)
    .then((friendsData) => {
      setFriendList(state => state.concat(friendsData.result));
    })
    .catch(err => console.log(err))
  }

  function handleConfirmPhotoChange(file) {
    updateCurrentUser({ data: file, avatar: true })
    .unwrap()
    .then((newUserInfo) => {
      popupClosed('confirmPhotoPopup');
      currentUserSetted(newUserInfo);
      handleNotification(true);
    })
    .catch((err) => {
      popupClosed('confirmPhotoPopup');
      handleNotification(false);
    })
  }

  return (
    <>
      <Header />
      <EditProfilePopup handleUpdateUser={ handleUpdateUser } />
      <ConfirmPopup confirmPopup={ confirmPopup } handleDeleteFriend={ handleDeleteFriend } />
      <ChangePhotoPopup />
      <ConfirmPhotoPopup handleConfirmPhotoChange={ handleConfirmPhotoChange } />
      <PicturePopup />
      <Notification />
      <main className="content">
        <ProfileContainer
          setPicturePopup={ props.setPicturePopup }
          handleProfilePhotoChange={ props.handleProfilePhotoChange }
          // eslint-disable-next-line eqeqeq
          profileInfo={ userId == currentUser.id ? currentUser : profileInfo }
          handleSignOut={ handleSignOut }
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