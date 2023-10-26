import './RequestsPage.css';
import Header from '../Header/Header';
import RequestsContent from '../RequestsContent/RequestsContent';
import ChatMenu from '../ChatMenu/ChatMenu';
import { useHandleRequestAnswerMutation } from '../../store/Api/api.Requests/api.Requests';
import { useActions } from '../../store/Hooks/useActions';
import HandleNotification from '../../customFunctions/HandleNotification';
import Notification from '../Notification/Notification';

function RequestsPage(props) {
  const [ handleRequestAnswer ] = useHandleRequestAnswerMutation();
  const { requestAnswered } = useActions();
  const { handleNotification } = HandleNotification();

  function handleFriend(friendToAdd, friendToRemove, userId) {
    handleRequestAnswer({ friend_to_add: friendToAdd, friend_to_remove: friendToRemove })
    .unwrap()
    .then(() => {
      requestAnswered(userId);
      handleNotification(true);
    })
    .catch(() => {
      handleNotification(false);
    })
  }

  return (
    <>
      <Header />
      <Notification />
      <main className="content">
        <ChatMenu
          searchForm={ true }
          inputPlaceholder="Поиск по заявкам"
          handleSearchSubmit={ props.handleSearchSubmit }
          setFriendsText={ props.setFriendsText }
        />
        <RequestsContent handleFriend={ handleFriend } />
      </main>
    </>
  );
}

export default RequestsPage;