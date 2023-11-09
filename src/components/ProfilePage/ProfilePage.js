import { useParams } from 'react-router-dom';
import './ProfilePage.css';
import '../App/App.css';
import ProfileContent from '../ProfileContent/ProfileContent';
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
import ChatMenu from '../ChatMenu/ChatMenu';
import PageStateQualifier from '../PageStateQualifier/PageStateQualifier';

function ProfilePage() {
  const { currentUser } = useSelector(state => state.currentUser);
  const [ profileInfo, setProfileInfo ] = useState({});
  const [ friendList, setFriendList ] = useState([]);
  const [ nextFriends, setNextFriends ] = useState('');
  const [ hasMoreFriends, setHasMoreFriends ] = useState(true);
  const { userId } = useParams();
  const [ updateCurrentUser ] = useUpdateCurrentUserMutation();
  const { currentUserSetted, isLoggedInSetted } = useActions();
  const { popupClosed } = useActions();
  const { handleNotification } = HandleNotification();
  const { isPageReadySetted } = useActions();

  useEffect(() => {
    isPageReadySetted(false);
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
      isPageReadySetted(true);
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
      isPageReadySetted(true);
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
      <EditProfilePopup handleUpdateUser={ handleUpdateUser } />
      <ConfirmPopup handleDeleteFriend={ handleDeleteFriend } />
      <ChangePhotoPopup />
      <ConfirmPhotoPopup handleConfirmPhotoChange={ handleConfirmPhotoChange } />
      <PicturePopup />
      <Notification />
      <main className="content">
        <section className="profile-page">
          <ChatMenu
            title="Профиль"
            optionsButton={ true }
            optionsButtonText="Выйти из аккаунта"
            onClickOptionsButton={ handleSignOut }
            isOptionButtonRed={ true }
          />
          <PageStateQualifier children={
            <ProfileContent
              // eslint-disable-next-line eqeqeq
              profileInfo={ userId == currentUser.id ? currentUser : profileInfo }
              userId={ userId }
              friendList={ friendList }
              hasMoreFriends={ hasMoreFriends }
              getMoreFriends={ getMoreFriends }
            />
          } />
        </section>
      </main>
    </>
  );
}

export default ProfilePage;