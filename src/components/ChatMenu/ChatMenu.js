import * as React from 'react';
import './ChatMenu.css';
import { useNavigate } from 'react-router-dom';
import arrow from '../../images/chat-menu__arrow.svg';
import ellipsis from '../../images/ellipsis.svg';
import loupeIcon from '../../images/loupe-icon.svg';

function ChatMenu(props) {
  const navigate = useNavigate();
  const [ searchInputValue, setSearchInputValue ] = React.useState('');

  function handleSearchInputValue(e) {
    setSearchInputValue(e.target.value);

    if (props.isContactsPage) {
      props.handleSearchSubmit(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (searchInputValue.length > 0) {
      props.handleSearchSubmit(searchInputValue);
    }

    props.setFriendsText('Нет результатов, попробуйте ввести другой запрос');
  }

  return (
    <div className="chat-menu">
      <div onClick={ () => navigate(-1) } className={ `chat-menu__back-button ${ props.isContactsPage ? 'display-none' : '' }` }>
        <img src={ arrow } className="chat-menu__arrow" alt="Стрелка назад" />
      </div>
      <form onSubmit={ handleSubmit } className={
        `chat-menu__search-form
        ${ props.searchForm ? "" : "display-none" }
        ${ props.isContactsPage ? "chat-menu__search-form_cont-page" : ""}`
      } noValidate>
        <img className="chat-menu__loupe-icon" src={ loupeIcon } alt="Иконка поиска" />
        <input
          type="text"
          className="chat-menu__input"
          placeholder={ props.inputPlaceholder }
          value={ searchInputValue }
          onChange={ handleSearchInputValue }
          required
        />
      </form>
      <h1 className="chat-menu__title">{ props.title || "" }</h1>
      <img src={ ellipsis } className={ `chat-menu__options ${ props.optionsButton ? "" : "display-none" }` } alt="Иконка опций" />
      <div className="chat-menu__options-cloud">
        <button type="button" onClick={ props.onClickOptionsButton } className={
          `chat-menu__options-cloud-link
          ${ props.isOptionButtonRed ? "chat-menu__options-cloud-link_exit" : "" }`
        }>{ props.optionsButtonText }</button>
      </div>
    </div>
  );
}

export default ChatMenu;