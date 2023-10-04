import './PicturePopup.css';
import Popup from '../Popup/Popup';

function PicturePopup(props) {
  return (
    <Popup handleClose={ props.closeAllPopups } isOpen={ props.picturePopup.isOpen } children={
      <img src={ props.picturePopup.src } alt="Аватар пользователя" className="picture-popup__image" />
    } />
  );
}

export default PicturePopup;