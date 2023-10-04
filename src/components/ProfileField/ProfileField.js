/* eslint-disable eqeqeq */
import * as React from 'react';
import './ProfileField.css';
import Userbar from '../Userbar/Userbar';
import logo from '../../images/logo.svg';
import addButton from '../../images/add-buddys-button.svg';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import Checkmark from '../../images/checkmark.svg';

function ProfileField(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isUserFriend = props.friendList.some(friend => friend.id === currentUser.id)

  function handleAvatarClick() {
    props.setPicturePopup({ isOpen: true, src: props.profileInfo.avatar || logo })
  }

  function handleEditButtonClick() {
    props.setEditProfilePopup({ isOpen: true});
  }

  return (
    <section className="profile-field">
      <div className="profile-field__photo-box">
        <img className={ `profile-field__photo ${ props.userId == currentUser.id ? "" : "profile-field__photo_other-user" }` } src={ props.profileInfo.avatar || logo } alt="Аватар пользователя" />
        <ul className="profile-field__pseudo-element">
          <li onClick={ handleAvatarClick } className="profile-field__pseudo-item">Открыть фото</li>
          <li onClick={ () => props.handleProfilePhotoChange() } className="profile-field__pseudo-item">Обновить фото</li>
        </ul>
      </div>
      <div className="profile-field__info">
        <h3 className="profile-field__name">{ props.profileInfo.username || "Ваше имя" }</h3>
        <p className={ `profile-field__status ${ props.userId == currentUser.id ? "" : "profile-field__status_other-user" }` }>{ props.profileInfo.status || "У меня самый лучший статус!" }</p>
      </div>
      <button type="button" onClick={ handleEditButtonClick } className={ `profile-field__edit-button ${ props.userId == currentUser.id ? "" : "display-none" }` }>Редактировать профиль</button>
      <button className={ `profile-field__add-button ${ props.userId == currentUser.id ? "display-none" : "" } ${ isUserFriend ? "profile-field__add-button_no-hover" : "" }` }>
        <img className="profile-field__add-image" src={ isUserFriend ? Checkmark : addButton } alt="Кнопка добавления пользователя"/>
        <p type="button" className="profile-field__add-button-text">{ isUserFriend ? "В списке друзей" : "Добавить в друзья" }</p>
      </button>
      <div className="profile-field__contacts">
        <h4 className="profile-field__contacts-title">{ props.userId == currentUser.id ? "Ваши контакты:" : "Контакты пользователя:" }</h4>
        {
          props.friendList.map((friend) => <Userbar
            userInfo={ friend }
            setIsPageReady={ props.setIsPageReady }
            deleteFriendButton={ true }
            setConfirmPopup={ props.setConfirmPopup }
          />)
        }
      </div>
    </section>
  );
}

export default ProfileField;