import * as React from 'react';
import './EditProfilePopup.css';
import Popup from '../Popup/Popup';
import CurrentUserContext from '../../Contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const formRef = React.createRef();
  const [ values, setValues ] = React.useState({ 'name-input': '', 'status-input': '' });
  const [ errors, setErrors ] = React.useState({ 'name-input': '', 'status-input': '' });
  const [ isFormValid, setIsFormValid ] = React.useState(false);
  const isInputsNew = values['name-input'] !== currentUser.username || values['status-input'] !== currentUser.status;
  const isStatusClear = values['status-input'] === "";

  React.useEffect(() => {
    values['name-input'] = currentUser.username;
    values['status-input'] = currentUser.status;
    setIsFormValid(formRef.current.checkValidity());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.editProfilePopup.isOpen ]);

  function handleInputValues(e) {
    setValues({ ...values, [ e.target.name ]: e.target.value });
    if (e.target.name === "name-input" && e.target.validationMessage === "Используйте требуемый формат.") {
      setErrors({ ...errors, [ e.target.name ]: "Поле name может содержать только латиницу и кириллицу, а также пробел или дефис." });
    } else {
      setErrors({ ...errors, [ e.target.name ]: e.target.validationMessage });
    }
    if(e.target.name === "status-input" && e.target.value.length < 1) {
      setErrors({ ...errors, [ e.target.name ]: "Поле статуса не может быть пустым" });
    }
    setIsFormValid(formRef.current.checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();

    props.handleUpdateUser({ username: values['name-input'], status: values['status-input'] });
  }

  function handleClose() {
    props.setEditProfilePopup(state => { return { ...state, isOpen: false } });
    setErrors({ 'name-input': '', 'status-input': '' });
  }

  return (
    <Popup handleClose={ handleClose } isOpen={ props.editProfilePopup.isOpen } children={
      <div className="edit-profile-popup">
        <h2 className="edit-profile-popup__title">Редактирование профиля</h2>
        <form className="edit-profile-popup__form" onSubmit={ onSubmit } ref={ formRef } noValidate>
          <input
            type="text"
            name="name-input"
            value={ values['name-input'] }
            onChange={ handleInputValues }
            pattern="[a-zA-ZА-Яа-яЁё\s\-]+"
            className="edit-profile-popup__input"
            placeholder="Имя"
            minLength="2"
            maxLength="20"
            required
          />
          <span className={ `edit-profile-popup__input-error ${ errors['name-input'] === '' ? "display-none" : ""}` }>{ errors['name-input'] }</span>
          <input
            type="text"
            name="status-input"
            value={ values['status-input'] }
            onChange={ handleInputValues }
            className="edit-profile-popup__input"
            placeholder="Краткая информация"
            maxLength="100"
          />
          <span className={ `edit-profile-popup__input-error ${ errors['status-input'] === '' ? "display-none" : ""}` }>{ errors['status-input'] }</span>
          <button type="submit" className={ `edit-profile-popup__button ${ isFormValid && isInputsNew && !isStatusClear ? "" : "edit-profile-popup__button_disabled" }` } disabled={ isFormValid && isInputsNew && !isStatusClear ? false : true }>Сохранить</button>
        </form>
      </div>
    } />
  )
}

export default EditProfilePopup;