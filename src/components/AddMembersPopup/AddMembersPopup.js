import './AddMembersPopup.css';
import Popup from '../Popup/Popup';
import Userbar from '../Userbar/Userbar';
import loupeIcon from '../../images/loupe-icon.svg';
import { useState } from 'react';
import { useActions } from '../../store/Hooks/useActions';
import { useSelector } from 'react-redux';

function AddMembersPopup(props) {
  const [ searchInputValue, setSearchInputValue ] = useState('');
  const { popupClosed } = useActions();
  const addMembersPopup = useSelector(state => state.popups.find(popup => popup.key === 'addMembersPopup'));

  function handleSearchInputValue(e) {
    setSearchInputValue(e.target.value);
  }

  function handleButtonClick() {
    props.onButtonClick(searchInputValue);
  }

  function handleClose() {
    popupClosed('addMembersPopup');
    setSearchInputValue('');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ addMembersPopup.isOpen } children={
      <div className="create-discuss-popup">
        <h2 className="create-discuss-popup__title">{ addMembersPopup.title }</h2>
        <div className="create-discuss-popup__box">
          <h3 className="create-discuss-popup__subtitle">Выберите контакты:</h3>
          {
            addMembersPopup.userList.map((user, index) => <Userbar
              key={ index }
              userInfo={ user }
              isOpen={ addMembersPopup.isOpen }
              isCheckBar={ true }
              handleMemberSet={ props.handleMemberSet }
            />)
          }
        </div>
        <div className="create-discuss-popup__submit-box">
          <form className={ `create-discuss-popup__form ${ addMembersPopup.isTitleNeed ? "" : "display-none" }` }>
            <img className="create-discuss-popup__loupe-icon" src={ loupeIcon } alt="Иконка поиска" />
            <input
              type="text"
              className="create-discuss-popup__title-input"
              placeholder="Название беседы"
              value={ searchInputValue }
              onChange={ handleSearchInputValue }
              required
            />
          </form>
          <button
            type="button"
            onClick={ handleButtonClick }
            className={
              `create-discuss-popup__button
              ${ addMembersPopup.isTitleNeed ? "" : "create-discuss-popup__button_no-input" }
              ${ props.membersToAdd.length > 0 ? "" : "create-discuss-popup__button_disabled" }` }
            disabled={ props.membersToAdd.length > 0 ? false : true }
          >{ addMembersPopup.buttonText }</button>
        </div>
      </div>
    } />
  )
}

export default AddMembersPopup;