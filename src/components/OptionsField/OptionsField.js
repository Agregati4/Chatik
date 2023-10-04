/* eslint-disable eqeqeq */
import * as React from 'react';
import './OptionsField.css';
import pencil from '../../images/pencil.svg';
import checkMark from '../../images/checkmark.svg';
import Userbar from '../Userbar/Userbar';
import logo from '../../images/logo.svg';

function OptionsField(props) {
  const input = React.createRef();
  const [ roomTitleValue, setRoomTitleValue ] = React.useState('');

  React.useEffect(() => {
    setRoomTitleValue(props.roomInfo.title);
  }, [ props.roomInfo ])

  function handleInputValue(e) {
    setRoomTitleValue(e.target.value);
  }

  function handlePencilClick() {
    input.current.focus();
  }

  function handleOpenPicture() {
    props.setPicturePopup({
      isOpen: true,
      src: props.roomInfo.avatar
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateRoomTitle(props.roomId, roomTitleValue);
  }

  return (
    <section className="options-field">
      <div className="options-field__info">
        <div className="options-field__photo-box">
          <img className="options-field__photo" src={ props.roomInfo.avatar || logo } alt="Аватар беседы" />
          <ul className="options-field__pseudo-element">
            <li onClick={ handleOpenPicture } className="options-field__pseudo-item">Открыть фото</li>
            <li onClick={ () => props.handleChatPhotoChange(props.roomId) } className="options-field__pseudo-item">Обновить фото</li>
          </ul>
        </div>
        <form className={ `options-field__input-form ${ roomTitleValue !== props.roomInfo.title ? "options-field__input-form_active" : "" }` } onSubmit={ handleSubmit }>
          <input
            className={ `options-field__input ${ roomTitleValue !== props.roomInfo.title ? "options-field__input_active" : "" }` }
            type="text"
            value={ roomTitleValue }
            onChange={ handleInputValue }
            ref={ input }
          />
          <button
            type={ `${ roomTitleValue == props.roomInfo.title ? "button" : "submit" }` }
            className={ `options-field__title-button` }
            onClick={ roomTitleValue !== props.roomInfo.title ? null : handlePencilClick }
          >
            <img
              className="options-field__icon"
              src={ roomTitleValue == props.roomInfo.title ? pencil : checkMark }
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
          props.roomInfo.member_set.map(user => <Userbar userInfo={ user } />)
        }
      </div>
    </section>
  );
}

export default OptionsField;