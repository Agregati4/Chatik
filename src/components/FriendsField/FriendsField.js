import './FriendsField.css';
import Userbar from '../Userbar/Userbar';

function FriendsField(props) {
  return (
    <div className="friends-field">
      {
        props.shownUsers < 1 ?
        <h2 className="friends-field__text">{ props.friendsText }</h2> :
        props.shownUsers.map(user => <Userbar userInfo={ user } />)
      }
    </div>
  );
}

export default FriendsField;