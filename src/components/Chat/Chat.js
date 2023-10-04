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
  const { roomId } = useParams();

  React.useEffect(() => {
    Promise.all([api.getChatMessages(roomId), api.getRoomInfo(roomId)])
    .then(([messageData, roomInfo]) => {
      setShownChatMessages(messageData.results.reverse());
      setNextMessagesLink(messageData.next);
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

  React.useEffect(() => {
    for(let i = 1; i < shownChatMessages.length; i++) {
      if (new Date(shownChatMessages[i].created_at.substring(0, 10)) > new Date(shownChatMessages[i-1].created_at.substring(0, 10))) {
        setShownChatMessages(state => {
          if (state) {
            const date = new Date(shownChatMessages[i].created_at);
            const month = date.toLocaleString('default', { month: 'short' })
            state[i].newDate = `${ date.getDay() } ${ month }`;
          }

          return state;
        })
      }
    }
  }, [ shownChatMessages ])

  async function handleSubmitChatInput(roomId, chatInputValue) {
    await api.createChatMessage(roomId, chatInputValue)
    .then((newMessage) => {
      setShownChatMessages(state => [ ...state, { ...newMessage, author: { avatar: currentUser.avatar, username: currentUser.username }, is_owner: true } ]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getMoreMessages() {
    api.getMoreMessages(nextMessagesLink)
    .then((messageData) => {
      setShownChatMessages(state => [ messageData.results.reverse(), ...state ]);
      setNextMessagesLink(messageData.next);
    })
    .catch()
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
        />
      </main>
    </>
  );
}

export default Chat;