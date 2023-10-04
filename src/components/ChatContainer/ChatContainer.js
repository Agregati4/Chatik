import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatContainer.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import ChatInputContainer from '../ChatInputContainer/ChatInputContainer';
import ChatField from '../ChatField/ChatField';
import Preloader from '../Preloader/Preloader';

function ChatContainer(props) {
  const navigate = useNavigate();

  return (
    <section className="chat-container">
      {
        props.isPageReady ?
        <>
          <ChatMenu
            optionsButton={ true }
            optionsButtonText="Настройки беседы"
            onClickOptionsButton={ () => navigate(`/options/${ props.roomId }`) }
            title={ props.roomInfo.title }
          />
          <ChatField
            shownChatMessages={ props.shownChatMessages }
            setShownChatMessages={ props.setShownChatMessages }
            getMoreMessages={ props.getMoreMessages }
          />
          <ChatInputContainer
            handleSubmitChatInput={ props.handleSubmitChatInput }
            chatInputValue={ props.chatInputValue }
            setChatInputValue={ props.setChatInputValue }
            roomId={ props.roomId }
          />
        </> :
        <>
          <ChatMenu
            optionsButton={ true }
            optionsButtonText="Настройки беседы"
            linkPath="/options"
            title={ props.roomInfo.title }
          />
          <Preloader />
          <ChatInputContainer
            handleSubmitChatInput={ props.handleSubmitChatInput }
            chatInputValue={ props.chatInputValue }
            setChatInputValue={ props.setChatInputValue }
            roomId={ props.roomId }
          />
        </>
      }
    </section>
  );
}

export default ChatContainer;