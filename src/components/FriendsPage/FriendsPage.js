import './FriendsPage.css';
import FriendsContent from '../FriendsContent/FriendsContent';
import api from '../../utils/Api';
import { useEffect, useState } from 'react';
import ChatMenu from '../ChatMenu/ChatMenu';
import { useActions } from '../../store/Hooks/useActions';
import PageStateQualifier from '../PageStateQualifier/PageStateQualifier';

function FriendsPage() {
  const [ shownUsers, setShownUsers ] = useState([]);
  const [ allUsersList, setAllUsersList ] = useState([]);
  const [ friendsText, setFriendsText ] = useState('Чтобы начать поиск друзей введите запрос и нажмите "Enter"');
  const { isPageReadySetted } = useActions();

  useEffect(() => {
    isPageReadySetted(false);
    api.getAllUsers()
    .then( usersData => {
      setAllUsersList(usersData.results);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isPageReadySetted(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearchSubmit(inputText) {
    const filteredUsers = allUsersList.filter(user => user.username.toLowerCase().includes(inputText.toLowerCase()));

    setShownUsers(filteredUsers);
  }

  return (
    <main className="content">
      <section className="friends-page">
        <ChatMenu
          searchForm={ true }
          inputPlaceholder="Поиск друзей"
          handleSearchSubmit={ handleSearchSubmit }
          setFriendsText={ setFriendsText }
        />
        <PageStateQualifier children={
          <FriendsContent
            shownUsers={ shownUsers }
            friendsText={ friendsText }
          />
        } />
      </section>
    </main>
  );
}

export default FriendsPage;