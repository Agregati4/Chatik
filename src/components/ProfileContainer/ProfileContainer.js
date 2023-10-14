import * as React from 'react';
import './ProfileContainer.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import ProfileField from '../ProfileField/ProfileField';
import Preloader from '../Preloader/Preloader';

function ProfileContainer(props) {
  return (
    <section className="profile-container">
      {
        props.isPageReady ?
        <>
          <ChatMenu
            title="Профиль"
            optionsButton={ true }
            optionsButtonText="Выйти из аккаунта"
            onClickOptionsButton={ props.handleSignOut }
            isOptionButtonRed={ true }
          />
          <ProfileField
            setPicturePopup={ props.setPicturePopup }
            handleProfilePhotoChange={ props.handleProfilePhotoChange }
            setEditProfilePopup={ props.setEditProfilePopup }
            profileInfo={ props.profileInfo }
            userId={ props.userId }
            friendList={ props.friendList }
            setIsPageReady={ props.setIsPageReady }
            setConfirmPopup={ props.setConfirmPopup }
            hasMoreFriends={ props.hasMoreFriends }
            getMoreFriends={ props.getMoreFriends }
          />
        </> :
        <>
          <ChatMenu
            title="Профиль"
            optionsButton={ true }
            optionsButtonText="Выйти из аккаунта"
            onClickOptionsButton={ props.handleSignOut }
            isOptionButtonRed={ true }
          />
          <Preloader />
        </>
      }
    </section>
  );
}

export default ProfileContainer;