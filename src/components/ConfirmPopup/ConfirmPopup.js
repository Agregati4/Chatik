import * as React from 'react';
import './ConfirmPopup.css';
import Popup from '../Popup/Popup';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';

function ConfirmPopup(props) {
  const confirmPopup = useSelector(state => state.popups.find(popup => popup.key === 'confirmPopup'));
  const { popupClosed } = useActions();

  function handleConfirm() {
    props.handleDeleteFriend(confirmPopup.friendId);
  }

  function handleClose() {
    popupClosed('confirmPopup');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ confirmPopup.isOpen } children={
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