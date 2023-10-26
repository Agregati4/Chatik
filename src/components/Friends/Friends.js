import './Friends.css';
import Header from '../Header/Header';
import FriendsContainer from '../FriendsContainer/FriendsContainer';
import api from '../../utils/Api';
import { useEffect, useState } from 'react';

function Friends(props) {
  const [ shownUsers, setShownUsers ] = useState([]);
  const [ usersArray, setUsersArray ] = useState([]);
  const [ friendsText, setFriendsText ] = useState('Чтобы начать поиск друзей введите запрос и нажмите "Enter"');
  const [ isPageReady, setIsPageReady ] = useState(false);

  useEffect(() => {
    api.getAllUsers()
    .then( usersData => {
      setUsersArray(usersData.results);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsPageReady(true);
    })
  }, [])

  function handleSearchSubmit(inputText) {
    const filteredUsers = usersArray.filter(user => user.username.toLowerCase().includes(inputText.toLowerCase()));

    setShownUsers(filteredUsers);
  }

  return (
    <>
      <Header />
      <main className="content">
        <FriendsContainer
          handleSearchSubmit={ handleSearchSubmit }
          shownUsers={ shownUsers }
          friendsText={ friendsText }
          setFriendsText={ setFriendsText }
          isPageReady={ isPageReady }
        />
      </main>
    </>
  );
}

export default Friends;