import './ChatMessage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

function ChatMessage(props) {
  const navigate = useNavigate();

  const date = new Date(props.messageData.created_at);

  return (
    <div className={ `chat-message ${ props.messageData.is_owner ? "" : "chat-message__other" }` }>
      <div className="chat-message__header">
        <img src={ props.messageData.author.avatar || logo } onClick={ () => navigate(`/profile/${ props.messageData.author.id }`) } className="chat-message__avatar" alt="аватар пользователя" />
        <h2 className="chat-message__buddy" onClick={ () => navigate(`/profile/${ props.messageData.author.id }`) }>{ props.messageData.author.username }</h2>
        <p className="chat-message__time">{ `${ date.getHours() }:${ date.getMinutes() < 10 ? "0" : "" }${ date.getMinutes() }` }</p>
      </div>
      <div className="chat-message__text-container">{ props.messageData.text }</div>
    </div>
  );
}

export default ChatMessage;