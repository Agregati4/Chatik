import './ConfirmPhotoPopup.css';
import Popup from '../Popup/Popup';

function ConfirmPhotoPopup(props) {
  return (
    <Popup handleClose={ props.closeAllPopups } isOpen={ props.confirmPhotoPopup.isOpen } children={
      <div className="confirm-photo-popup">
        <h2 className="confirm-photo-popup__title">Фотография на вашей странице</h2>
        <img src={ props.confirmPhotoPopup.src } className="confirm-photo-popup__image" alt="Новая фотография" />
        <div className="confirm-photo-popup__buttons">
          <button type="button" onClick={ () => props.handleConfirmPhoto(props.confirmPhotoPopup.file) } className="confirm-photo-popup__button confirm-photo-popup__button_save">Сохранить</button>
          <button type="button" onClick={ props.closeAllPopups } className="confirm-photo-popup__button">Отмена</button>
        </div>
      </div>
    } />
  )
}

export default ConfirmPhotoPopup;