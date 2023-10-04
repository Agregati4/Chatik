import * as React from 'react';
import './ChangePhotoPopup.css';
import Popup from '../Popup/Popup';

function ChangePhotoPopup(props) {
  return (
    <Popup handleClose={ props.closeAllPopups } isOpen={ props.changePhotoPopup.isOpen } children={
      <div className="change-photo-popup">
        <h2 className="change-photo-popup__title">Загрузка новой фотографии</h2>
        <input onChange={ (e) => props.handleChoosePhoto(e) } id="photo-input" className="change-photo-popup__input" type="file" />
        <label htmlFor="photo-input" className="change-photo-popup__styled-input">Выберите файл</label>
      </div>
    } />
  )
}

export default ChangePhotoPopup;