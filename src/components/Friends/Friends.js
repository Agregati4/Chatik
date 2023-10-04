import * as React from 'react';
import './Friends.css';
import Header from '../Header/Header';
import FriendsContainer from '../FriendsContainer/FriendsContainer';
import api from '../../utils/Api';

function Friends(props) {
  const [ shownUsers, setShownUsers ] = React.useState([]);
  const [ usersArray, setUsersArray ] = React.useState([]);
  const [ friendsText, setFriendsText ] = React.useState('Чтобы начать поиск друзей введите запрос и нажмите "Enter"');
  const [ friendRequests, setFriendRequests ] = React.useState([]);
  const [ isPageReady, setIsPageReady ] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getAllUsers(), api.getFriendRequests()])
    .then(([usersData, friendRequests]) => {
      setUsersArray(usersData.results);
      setFriendRequests(friendRequests.results);
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

  function handleFriend(friendToAdd, friendToRemove, userId) {
    api.handleFriend(friendToAdd, friendToRemove)
    .then(() => {
      setFriendRequests(state => state.filter(friend => friend.id !== userId));
    })
    .catch(err => console.log(err))
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
          friendRequests={ friendRequests }
          isPageReady={ isPageReady }
          handleFriend={ handleFriend }
        />
      </main>
    </>
  );
}

export default Friends;