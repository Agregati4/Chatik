import './FriendRequestsPage.css';
import FriendRequestsContent from '../FriendRequestsContent/FriendRequestsContent';
import ChatMenu from '../ChatMenu/ChatMenu';
import { useHandleRequestAnswerMutation } from '../../store/Api/api.Requests/api.Requests';
import { useActions } from '../../store/Hooks/useActions';
import HandleNotification from '../../customFunctions/HandleNotification';
import Notification from '../Notification/Notification';

function FriendRequestsPage() {
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
      <Notification />
      <main className="content">
        <section className="friends-requests-page">
          <ChatMenu
            searchForm={ true }
            inputPlaceholder="Поиск по заявкам"
          />
          <FriendRequestsContent
            handleFriend={ handleFriend }
          />
        </section>
      </main>
    </>
  )
}

export default FriendRequestsPage;