import * as React from 'react';
import './ChatInputContainer.css';
import SendButtonImage from '../../images/chat-input__send-button.svg';

function ChatInputContainer(props) {
  const [ chatInputValue, setChatInputValue ] = React.useState('');

  function handleChange(e) {
    setChatInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSubmitChatInput(props.roomId, chatInputValue)
    .then(() => {
      setChatInputValue('');
    })
    .catch(() => {
      setChatInputValue('');
    })
  }

  return (
    <div className="chat-input-container">
      <form className="chat-input-container__form" onSubmit={ handleSubmit } noValidate>
        <input
          placeholder="Ваше сообщение"
          className="chat-input-container__input"
          value={ chatInputValue }
          onChange={ handleChange }
          minLength='1'
          required
        />
        <button type="submit" className="chat-input-container__send-button">
          <img src={ SendButtonImage } className="chat-input-container__send-button-image" alt="Кнопка отправки сообщения" />
        </button>
      </form>
    </div>
  );
}

export default ChatInputContainer;