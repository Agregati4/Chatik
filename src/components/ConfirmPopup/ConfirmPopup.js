import * as React from 'react';
import './ConfirmPopup.css';
import Popup from '../Popup/Popup';

function ConfirmPopup(props) {
  function handleConfirm() {
    props.handleDeleteFriend(props.confirmPopup.friendId);
  }

  return (
    <Popup handleClose={ props.handleClose } isOpen={ props.confirmPopup.isOpen } children={
      <div className="confirm-popup">
        <h2 className="confirm-popup__title">Вы уверены?</h2>
        <div className="confirm-popup__buttons">
          <button type="button" onClick={ handleConfirm } className="confirm-popup__button">Да</button>
          <button type="button" onClick={ props.handleClose } className="confirm-popup__button confirm-popup__button_red">Отмена</button>
        </div>
      </div>
    } />
  )
}

export default ConfirmPopup;