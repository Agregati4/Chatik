/* eslint-disable eqeqeq */
import './RoomOptionsContent.css';
import pencil from '../../images/pencil.svg';
import checkMark from '../../images/checkmark.svg';
import logo from '../../images/logo.svg';
import Userbar from '../Userbar/Userbar';
import { createRef, useEffect, useState } from 'react';
import { useActions } from '../../store/Hooks/useActions';
import { useSelector } from 'react-redux';

function RoomOptionsContent(props) {
  const input = createRef();
  const [ roomTitleValue, setRoomTitleValue ] = useState('');
  const { popupOpened } = useActions();
  const { roomInfo } = useSelector(state => state.roomInfo);

  useEffect(() => {
    setRoomTitleValue(roomInfo.title);
  }, [ roomInfo ])

  function handleInputValue(e) {
    setRoomTitleValue(e.target.value);
  }

  function handlePencilClick() {
    input.current.focus();
  }

  function handleOpenPicture() {
    popupOpened({
      isOpen: true,
      src: roomInfo.avatar,
      key: 'picturePopup'
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateRoomTitle(props.roomId, roomTitleValue);
  }

  function handleChatPhotoChange() {
    popupOpened({ isOpen: true, key: 'selectPhotoPopup', roomId: props.roomId });
  }

  return (
    <div className="room-options-content">
      <div className="room-options-content__info">
        <div className="room-options-content__photo-box">
          <img className="room-options-content__photo" src={ roomInfo.avatar || logo } alt="Аватар беседы" />
          <ul className="room-options-content__pseudo-element">
            <li onClick={ handleOpenPicture } className="room-options-content__pseudo-item">Открыть фото</li>
            <li onClick={ () => handleChatPhotoChange(props.roomId) } className="room-options-content__pseudo-item">Обновить фото</li>
          </ul>
        </div>
        <form className={ `room-options-content__input-form ${ roomTitleValue !== roomInfo.title ? "room-options-content__input-form_active" : "" }` } onSubmit={ handleSubmit }>
          <input
            className={ `room-options-content__input ${ roomTitleValue !== roomInfo.title ? "room-options-content__input_active" : "" }` }
            type="text"
            value={ roomTitleValue }
            onChange={ handleInputValue }
            ref={ input }
          />
          <button
            type={ `${ roomTitleValue == roomInfo.title ? "button" : "submit" }` }
            className={ `room-options-content__title-button` }
            onClick={ roomTitleValue !== roomInfo.title ? null : handlePencilClick }
          >
            <img
              className="room-options-content__icon"
              src={ roomTitleValue == roomInfo.title ? pencil : checkMark }
              alt="Кнопка редактирования"
            />
          </button>
        </form>
      </div>
      <div className="room-options-content__buddys">
        <div className="room-options-content__buddys-header">
          <h2 className="room-options-content__title">Участники беседы:</h2>
          <button type="button" onClick={ props.handleOpenCreateRoomPopup } className="room-options-content__add-buddys-button"></button>
        </div>
        {
          roomInfo.member_set.map((user, index) => <Userbar key={ index } userInfo={ user } />)
        }
      </div>
    </div>
  );
}

export default RoomOptionsContent;