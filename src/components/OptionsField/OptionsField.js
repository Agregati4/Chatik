/* eslint-disable eqeqeq */
import './OptionsField.css';
import pencil from '../../images/pencil.svg';
import checkMark from '../../images/checkmark.svg';
import Userbar from '../Userbar/Userbar';
import logo from '../../images/logo.svg';
import { useActions } from '../../store/Hooks/useActions';
import { useSelector } from 'react-redux';
import { createRef, useEffect, useState } from 'react';

function OptionsField(props) {
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
    <section className="options-field">
      <div className="options-field__info">
        <div className="options-field__photo-box">
          <img className="options-field__photo" src={ roomInfo.avatar || logo } alt="Аватар беседы" />
          <ul className="options-field__pseudo-element">
            <li onClick={ handleOpenPicture } className="options-field__pseudo-item">Открыть фото</li>
            <li onClick={ () => handleChatPhotoChange(props.roomId) } className="options-field__pseudo-item">Обновить фото</li>
          </ul>
        </div>
        <form className={ `options-field__input-form ${ roomTitleValue !== roomInfo.title ? "options-field__input-form_active" : "" }` } onSubmit={ handleSubmit }>
          <input
            className={ `options-field__input ${ roomTitleValue !== roomInfo.title ? "options-field__input_active" : "" }` }
            type="text"
            value={ roomTitleValue }
            onChange={ handleInputValue }
            ref={ input }
          />
          <button
            type={ `${ roomTitleValue == roomInfo.title ? "button" : "submit" }` }
            className={ `options-field__title-button` }
            onClick={ roomTitleValue !== roomInfo.title ? null : handlePencilClick }
          >
            <img
              className="options-field__icon"
              src={ roomTitleValue == roomInfo.title ? pencil : checkMark }
              alt="Кнопка редактирования"
            />
          </button>
        </form>
      </div>
      <div className="options-field__buddys">
        <div className="options-field__buddys-header">
          <h2 className="options-field__title">Участники беседы:</h2>
          <button type="button" onClick={ props.handleOpenCreateRoomPopup } className="options-field__add-buddys-button"></button>
        </div>
        {
          roomInfo.member_set.map((user, index) => <Userbar key={ index } userInfo={ user } />)
        }
      </div>
    </section>
  );
}

export default OptionsField;