import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatContainer.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import ChatInputContainer from '../ChatInputContainer/ChatInputContainer';
import Preloader from '../Preloader/Preloader';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatMessage from '../ChatMessage/ChatMessage';

function ChatContainer(props) {
  const navigate = useNavigate();

  return (
    <section className="chat-container" id="scrollableDiv">
      <ChatMenu
        optionsButton={ true }
        optionsButtonText="Настройки беседы"
        onClickOptionsButton={ () => navigate(`/options/${ props.roomId }`) }
        title={ props.roomInfo.title }
      />
      {
        props.isPageReady ?
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
        </InfiniteScroll> :
        <Preloader />
      }
      <ChatInputContainer
        handleSubmitChatInput={ props.handleSubmitChatInput }
        chatInputValue={ props.chatInputValue }
        setChatInputValue={ props.setChatInputValue }
        roomId={ props.roomId }
      />
    </section>
  );
}

export default ChatContainer;