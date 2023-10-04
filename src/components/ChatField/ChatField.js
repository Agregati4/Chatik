import * as React from 'react';
import './ChatField.css';
import ChatMessage from '../ChatMessage/ChatMessage';

function ChatField(props) {
  const scroll = React.useRef(null);

  React.useEffect(() => {
    scroll.current?.scrollIntoView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.shownChatMessages ]);

  return (
    <div className="chat-field">
      {
        props.shownChatMessages.map((message, index) => {
          return (
          <div key={ index } className="chat-field__message-container">
            <div className={ `chat-field__new-date ${ message.newDate ? "" : "display-none" }` }>{ message.newDate }</div>
            <ChatMessage messageData={ message } />
          </div>
          )
        })
      }
      <div ref={ scroll } />
    </div>
  );
}

export default ChatField;