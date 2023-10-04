import './FriendsField.css';
import Userbar from '../Userbar/Userbar';

function FriendsField(props) {
  return (
    <div className="friends-field">
      {
        props.friendRequests.length > 0 ?
        <section className="friends-field__requests-box">
          <h2 className="friends-field__text">Ваши заявки в друзья:</h2>
          {
            props.friendRequests.map(friendRequest => <Userbar
              userInfo={ friendRequest }
              isFriendRequest={ true }
              handleFriend={ props.handleFriend }
            />)
          }
        </section> :
        <></>
      }
      {
        props.shownUsers < 1 ?
        <h2 className="friends-field__text">{ props.friendsText }</h2> :
        props.shownUsers.map(user => <Userbar userInfo={ user } />)
      }
    </div>
  );
}

export default FriendsField;