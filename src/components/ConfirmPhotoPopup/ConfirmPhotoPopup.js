import './ConfirmPhotoPopup.css';
import Popup from '../Popup/Popup';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';

function ConfirmPhotoPopup(props) {
  const confirmPhotoPopup = useSelector(state => state.popups.find(popup => popup.key === 'confirmPhotoPopup'));
  const { popupClosed } = useActions();

  function handleClose() {
    popupClosed('confirmPhotoPopup');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ confirmPhotoPopup.isOpen } children={
      <div className="confirm-photo-popup">
        <h2 className="confirm-photo-popup__title">Фотография на вашей странице</h2>
        <img src={ confirmPhotoPopup.src } className="confirm-photo-popup__image" alt="Новая фотография" />
        <div className="confirm-photo-popup__buttons">
          <button type="button" onClick={ () => props.handleConfirmPhotoChange(confirmPhotoPopup.file) } className="confirm-photo-popup__button confirm-photo-popup__button_save">Сохранить</button>
          <button type="button" onClick={ props.closeAllPopups } className="confirm-photo-popup__button">Отмена</button>
        </div>
      </div>
    } />
  )
}

export default ConfirmPhotoPopup;