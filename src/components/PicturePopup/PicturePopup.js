import './PicturePopup.css';
import Popup from '../Popup/Popup';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';

function PicturePopup(props) {
  const picturePopup = useSelector(state => state.popups.find(popup => popup.key === 'picturePopup'));
  const { popupClosed } = useActions();

  function handleClose() {
    popupClosed('picturePopup');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ picturePopup.isOpen } children={
      <img src={ picturePopup.src } alt="Аватар пользователя" className="picture-popup__image" />
    } />
  );
}

export default PicturePopup;