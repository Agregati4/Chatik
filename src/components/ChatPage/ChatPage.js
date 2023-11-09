import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './ChatPage.css';
import '../App/App.css';
import ChatContent from '../ChatContent/ChatContent';
import api from '../../utils/Api';
import { useSelector } from 'react-redux';
import { useActions } from '../../store/Hooks/useActions';
import ChatMenu from '../ChatMenu/ChatMenu';
import ChatInputContainer from '../ChatInputContainer/ChatInputContainer';
import PageStateQualifier from '../PageStateQualifier/PageStateQualifier';

function ChatPage() {
  const { currentUser } = useSelector(state => state.currentUser);
  const [ shownChatMessages, setShownChatMessages ] = React.useState([]);
  const [ nextMessagesLink, setNextMessagesLink ] = React.useState('');
  const [ hasMoreMessages, setHasMoreMessages ] = React.useState(true);
  const { roomId } = useParams();
  const { roomInfoSetted } = useActions();
  const navigate = useNavigate();
  const { roomInfo } = useSelector(state => state.roomInfo);
  const { isPageReadySetted } = useActions();

  React.useEffect(() => {
    Promise.all([api.getChatMessages(roomId), api.getRoomInfo(roomId)])
    .then(([messageData, roomInfo]) => {
      const messagesToAdd = messageData.results;
      addDateChangeNotesInMessageList(messagesToAdd);

      setShownChatMessages(messagesToAdd);

      messageData.next ? setNextMessagesLink(messageData.next) : setHasMoreMessages(false);
      roomInfoSetted(roomInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isPageReadySetted(true);
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
        addDateChangeNotesInMessageList(messagesToAdd);

        setShownChatMessages(state => state.concat(messagesToAdd));

        messageData.next ? setNextMessagesLink(messageData.next) : setHasMoreMessages(false);
      })
      .catch(err => console.log(err))
    }, 100)
  }

  function addDateChangeNotesInMessageList(messagesToAdd) {
    for(let i = 1; i < messagesToAdd.length; i++) {
      if (new Date(messagesToAdd[i].created_at.substring(0, 10)) < new Date(messagesToAdd[i-1].created_at.substring(0, 10))) {
        const date = new Date(messagesToAdd[i].created_at);
        const month = date.toLocaleString('default', { month: 'short' })
        messagesToAdd[i].newDate = `${ date.getDate() } ${ month }`;
      }
    }
  }

  return (
    <main className="content">
      <section className="chat-page" id="scrollableDiv">
        <ChatMenu
          optionsButton={ true }
          optionsButtonText="Настройки беседы"
          onClickOptionsButton={ () => navigate(`/options/${ roomId }`) }
          title={ roomInfo.title }
        />
        <PageStateQualifier children={
          <ChatContent
            shownChatMessages={ shownChatMessages }
            setShownChatMessages={ setShownChatMessages }
            getMoreMessages={ getMoreMessages }
            hasMoreMessages={ hasMoreMessages }
          />
        } />
        <ChatInputContainer
          handleSubmitChatInput={ handleSubmitChatInput }
          roomId={ roomId }
        />
      </section>
    </main>
  );
}

export default ChatPage;