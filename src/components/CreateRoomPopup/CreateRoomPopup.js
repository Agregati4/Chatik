import * as React from 'react';
import './CreateRoomPopup.css';
import Popup from '../Popup/Popup';
import Userbar from '../Userbar/Userbar';
import loupeIcon from '../../images/loupe-icon.svg';

function CreateRoomPopup(props) {
  const [ searchInputValue, setSearchInputValue ] = React.useState('');

  function handleSearchInputValue(e) {
    setSearchInputValue(e.target.value);
  }

  function handleButtonClick() {
    props.onButtonClick(searchInputValue);
  }

  function handleClose() {
    props.setCreateRoomPopup(state => { return { ...state, isOpen: false } });
    setSearchInputValue('');
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ props.createRoomPopup.isOpen } children={
      <div className="create-discuss-popup">
        <h2 className="create-discuss-popup__title">{ props.createRoomPopup.title }</h2>
        <div className="create-discuss-popup__box">
          <h3 className="create-discuss-popup__subtitle">Выберите контакты:</h3>
          {
            props.createRoomPopup.userList.map((user, index) => <Userbar
              key={ index }
              userInfo={ user }
              isOpen={ props.createRoomPopup.isOpen }
              isCheckBar={ true }
              handleMemberSet={ props.handleMemberSet }
            />)
          }
        </div>
        <div className="create-discuss-popup__submit-box">
          <form className={ `create-discuss-popup__form ${ props.createRoomPopup.isTitleNeed ? "" : "display-none" }` }>
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
              ${ props.createRoomPopup.isTitleNeed ? "" : "create-discuss-popup__button_no-input" }
              ${ props.membersToAdd.length > 0 ? "" : "create-discuss-popup__button_disabled" }` }
            disabled={ props.membersToAdd.length > 0 ? false : true }
          >{ props.createRoomPopup.buttonText }</button>
        </div>
      </div>
    } />
  )
}

export default CreateRoomPopup;