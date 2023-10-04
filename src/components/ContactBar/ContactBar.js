import * as React from 'react';
import './ContactBar.css';
import '../App/App.css';
import logo from '../../images/logo.svg';

function ContactBar(props) {
  const date = props.roomInfo.last_message ? new Date(props.roomInfo.last_message.created_at) : null;

  function handleBarClick() {
    props.onClick(props.roomInfo.id);
  }

  return (
    <div onClick={ handleBarClick } className="contact-bar">
      <img src={ props.avatar || logo } className="contact-bar__image" alt="Аватарка беседы" />
      <div className={ `contact-bar__info ${ props.roomInfo.last_message ? "" : "contact-bar__info_center" }` }>
        <h2 className="contact-bar__title">{ props.roomInfo.title }</h2>
        <p className={ `contact-bar__last-message ${ props.roomInfo.last_message ? "" : "display-none" }` }>
          { props.roomInfo.last_message && props.roomInfo.last_message.is_owner ? "Вы: " : "" }
          { props.roomInfo.last_message ? props.roomInfo.last_message.text : "" }
        </p>
      </div>
      <p className="contact-bar__message-time">{ `${ date ? date.getHours() : "" }${ date ? ":" : ""}${ date && date.getMinutes() < 10 ? "0" : "" }${ date ? date.getMinutes() : "" }` }</p>
    </div>
  );
}

export default ContactBar;