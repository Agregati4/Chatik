import * as React from 'react';
import { useParams } from 'react-router-dom'
import './Chat.css';
import '../App/App.css';
import Header from '../Header/Header';
import ChatContainer from '../ChatContainer/ChatContainer';
import api from '../../utils/Api';
import logo from '../../images/logo.svg';
import CurrentUserContext from '../../Contexts/CurrentUserContext';

function Chat(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [ isPageReady, setIsPageReady ] = React.useState(false);
  const [ shownChatMessages, setShownChatMessages ] = React.useState([]);
  const [ roomInfo, setRoomInfo ] = React.useState({ title: "", avatar: logo });
  const [ nextMessagesLink, setNextMessagesLink ] = React.useState('');
  const [ hasMoreMessages, setHasMoreMessages ] = React.useState(true);
  const { roomId } = useParams();

  React.useEffect(() => {
    Promise.all([api.getChatMessages(roomId), api.getRoomInfo(roomId)])
    .then(([messageData, roomInfo]) => {
      const messagesToAdd = messageData.results;
      for(let i = 1; i < messagesToAdd.length; i++) {
        if (new Date(messagesToAdd[i].created_at.substring(0, 10)) < new Date(messagesToAdd[i-1].created_at.substring(0, 10))) {
          const date = new Date(messagesToAdd[i-1].created_at);
          const month = date.toLocaleString('default', { month: 'short' })
          messagesToAdd[i].newDate = `${ date.getDate() } ${ month }`;
        }
      }

      setShownChatMessages(messagesToAdd);

      if (messageData.next) {
        setNextMessagesLink(messageData.next);
      } else {
        setHasMoreMessages(false);
      }
      setRoomInfo(roomInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsPageReady(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ roomId ]);

  async function handleSubmitChatInput(roomId, chatInputValue) {
    await api.createChatMessage(roomId, chatInputValue)
    .then((newMessage) => {
      setShownChatMessages(state => [ { ...newMessage, author: { avatar: currentUser.avatar, username: currentUser.username }, is_owner: true }, ...state ]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getMoreMessages() {
    setTimeout(() => {
      api.getMoreMessages(nextMessagesLink)
      .then((messageData) => {
        const messagesToAdd = messageData.results;

        for(let i = 1; i < messagesToAdd.length; i++) {
          if (new Date(messagesToAdd[i].created_at.substring(0, 10)) < new Date(messagesToAdd[i-1].created_at.substring(0, 10))) {
            const date = new Date(messagesToAdd[i].created_at);
            const month = date.toLocaleString('default', { month: 'short' })
            messagesToAdd[i].newDate = `${ date.getDate() } ${ month }`;
          }
        }

        setShownChatMessages(state => state.concat(messagesToAdd));
  
        if (messageData.next) {
          setNextMessagesLink(messageData.next);
        } else {
          setHasMoreMessages(false);
        }
      })
      .catch(err => console.log(err))
    }, 100)
  }

  return (
    <>
      <Header />
      <main className="content">
        <ChatContainer
          shownChatMessages={ shownChatMessages }
          setShownChatMessages={ setShownChatMessages }
          handleChatMessagesOnUpdate={ props.handleChatMessagesOnUpdate }
          handleSubmitChatInput={ handleSubmitChatInput }
          isPageReady={ isPageReady }
          roomId={ roomId }
          roomInfo={ roomInfo }
          getMoreMessages={ getMoreMessages }
          hasMoreMessages={ hasMoreMessages }
        />
      </main>
    </>
  );
}

export default Chat;