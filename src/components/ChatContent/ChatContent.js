import * as React from 'react';
import './ChatContent.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatMessage from '../ChatMessage/ChatMessage';

function ChatContent(props) {
  return (
      <InfiniteScroll
        className="chat-container__message-container"
        dataLength={ props.shownChatMessages.length }
        next={ props.getMoreMessages }
        hasMore={ props.hasMoreMessages }
        loader={ <h2 className={ `chat-container__loader ${ props.shownChatMessages.length > 1 ? "" : "display-none"}` }>Загрузка...</h2> }
        inverse={ true }
        scrollableTarget="scrollableDiv"
      >
        {
          props.shownChatMessages.map((message, index) =>
          <div key={ index } className="chat-container__message-box">
            <p className={ `chat-container__new-date ${ message.newDate ? "" : "display-none" }` }>{ message.newDate }</p>
            <ChatMessage messageData={ message } />
          </div>)
        }
      </InfiniteScroll>
  );
}

export default ChatContent;