import { useNavigate } from 'react-router-dom';
import './Userbar.css';
import '../App/App.css';
import logo from '../../images/logo.svg';
import checkmarkGreen from '../../images/checkmarkGreen.svg';
import deleteButton from '../../images/deleteButton.svg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useActions } from '../../store/Hooks/useActions';

function Userbar(props) {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.currentUser);
  const [ checkboxState, setCheckboxState ] = useState(false);
  const { popupOpened } = useActions();

  useEffect(() => {
    setCheckboxState(false);
  }, [ props.isOpen ])

  function handleCheckboxState() {
    setCheckboxState(state => !state);
  }

  function handleNavigate(e) {
    if (e.target.className !== "user-bar__friend-button" && e.target.className !== "user-bar__friend-button  ") {
      props.setIsPageReady(false);
      navigate(`/profile/${ props.userInfo.id }`);
    }
  }

  function handleClick() {
    handleCheckboxState();

    props.handleMemberSet(props.userInfo.id);
  }

  function handleFriendButtonClick(e) {
    if (e.target.alt === "Принять запрос") {
      props.handleFriend([props.userInfo.id], [], props.userInfo.id);
    } else {
      props.handleFriend([], [props.userInfo.id], props.userInfo.id);
    }
  }

  function handleOpenConfirmPopup() {
    popupOpened({ isOpen: true, friendId: props.userInfo.id, key: 'confirmPopup'});
  }

  return (
    <label onClick={ props.isCheckBar ? handleClick : handleNavigate } className="user-bar">
      <img
        src={ props.userInfo.avatar || logo }
        className="user-bar__image"
        alt="Аватарка беседы"
      />
      <h2 className="user-bar__title">{ props.userInfo.username }</h2>
      <div className={ `user-bar__checkbox ${ props.isCheckBar ? "" : "display-none"} ${ checkboxState ? "user-bar__checkbox_active" : "" }` }></div>
      <div className={ `user-bar__buttons-box ${ props.isFriendRequest ? "" : "display-none" }` }>
        <img onClick={ handleFriendButtonClick } className="user-bar__friend-button" src={ checkmarkGreen } alt="Принять запрос" />
        <img onClick={ handleFriendButtonClick } className="user-bar__friend-button" src={ deleteButton } alt="Отклонить запрос" />
      </div>
      <img
        onClick={ handleOpenConfirmPopup }
        // eslint-disable-next-line eqeqeq
        className={ `user-bar__friend-button ${ props.deleteFriendButton ? "" : "display-none" } ${ props.profileId == currentUser.id ? "" : "display-none" }` }
        src={ deleteButton }
        alt="Удалить"
      />
    </label>
  );
}

export default Userbar;