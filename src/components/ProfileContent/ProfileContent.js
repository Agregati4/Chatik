/* eslint-disable eqeqeq */
import './ProfileContent.css';
import Userbar from '../Userbar/Userbar';
import logo from '../../images/logo.svg';
import addButton from '../../images/add-buddys-button.svg';
import Checkmark from '../../images/checkmark.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';

function ProfileContent(props) {
  const { currentUser } = useSelector(state => state.currentUser);
  const isUserFriend = props.friendList.some(friend => friend.id === currentUser.id);
  const { popupOpened } = useActions();

  function handleAvatarClick() {
    popupOpened({ isOpen: true, src: props.profileInfo.avatar || logo, key: 'picturePopup' });
  }

  function handleEditButtonClick() {
    popupOpened({ isOpen: true, key:'editProfilePopup' });
  }

  function handleProfilePhotoChange() {
    popupOpened({ isOpen: true, key: 'selectPhotoPopup' });
  }

  return (
    <div className="profile-content">
      <div className="profile-content__photo-box">
        <img className={ `profile-content__photo ${ props.userId == currentUser.id ? "" : "profile-content__photo_other-user" }` } src={ props.profileInfo.avatar || logo } alt="Аватар пользователя" />
        <ul className="profile-content__pseudo-element">
          <li onClick={ handleAvatarClick } className="profile-content__pseudo-item">Открыть фото</li>
          {
            props.profileInfo.id !== currentUser.id ?
            <></> :
            <li onClick={ handleProfilePhotoChange } className="profile-content__pseudo-item">Обновить фото</li>
          }
        </ul>
      </div>
      <div className="profile-content__info">
        <h3 className="profile-content__name">{ props.profileInfo.username || "Ваше имя" }</h3>
        <p className={ `profile-content__status ${ props.userId == currentUser.id ? "" : "profile-content__status_other-user" }` }>{ props.profileInfo.status || "У меня самый лучший статус!" }</p>
      </div>
      <button type="button" onClick={ handleEditButtonClick } className={ `profile-content__edit-button ${ props.userId == currentUser.id ? "" : "display-none" }` }>Редактировать профиль</button>
      <button className={ `profile-content__add-button ${ props.userId == currentUser.id ? "display-none" : "" } ${ isUserFriend ? "profile-content__add-button_no-hover" : "" }` }>
        <img className="profile-content__add-image" src={ isUserFriend ? Checkmark : addButton } alt="Кнопка добавления пользователя"/>
        <p type="button" className="profile-content__add-button-text">{ isUserFriend ? "В списке друзей" : "Добавить в друзья" }</p>
      </button>
      <div className="profile-content__contacts">
        <h4 className="profile-content__contacts-title">{ props.userId == currentUser.id ? "Ваши контакты:" : "Контакты пользователя:" }</h4>
        <InfiniteScroll
          dataLength={ props.friendList.length }
          next={ props.getMoreFriends }
          hasMore={ props.hasMoreFriends }
          loader={ <p className={ `profile-content__loader ${ props.friendList > 0 ? "" : "display-none"}` }>Загрузка...</p> }
        >
        {
          props.friendList.map((friend, index) => <Userbar
            key={ index }
            userInfo={ friend }
            setIsPageReady={ props.setIsPageReady }
            deleteFriendButton={ true }
            setConfirmPopup={ props.setConfirmPopup }
            profileId={ props.userId }
          />)
        }
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ProfileContent;