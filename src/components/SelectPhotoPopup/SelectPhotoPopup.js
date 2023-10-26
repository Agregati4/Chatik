import * as React from 'react';
import './SelectPhotoPopup.css';
import Popup from '../Popup/Popup';
import { useActions } from '../../store/Hooks/useActions';
import { useSelector } from 'react-redux';

function SelectPhotoPopup() {
  const changePhotoPopup = useSelector(state => state.popups.find(popup => popup.key === 'selectPhotoPopup'));
  const { popupClosed, popupOpened } = useActions();

  function handleChoosePhoto(e) {
    const files = e.target.files;

    if (files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function(e) {
        const formData = new FormData();
        formData.append('avatar', files[0]);

        popupOpened({ isOpen: true, src: e.target.result, file: formData, key: 'confirmPhotoPopup' });
      }
    }

    handleClose();
  }

  function handleClose() {
    popupClosed('selectPhotoPopup');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ changePhotoPopup.isOpen } children={
      <div className="change-photo-popup">
        <h2 className="change-photo-popup__title">Загрузка новой фотографии</h2>
        <input onInput={ (e) => handleChoosePhoto(e) } id="photo-input" className="change-photo-popup__input" type="file" />
        <label htmlFor="photo-input" className="change-photo-popup__styled-input">Выберите файл</label>
      </div>
    } />
  )
}

export default SelectPhotoPopup;