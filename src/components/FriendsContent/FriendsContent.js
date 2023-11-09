import './FriendsContent.css';
import Userbar from '../Userbar/Userbar';

function FriendsContent(props) {
  return (
    <div className="friends-content">
      {
        props.shownUsers < 1 ?
        <h2 className="friends-content__text">{ props.friendsText }</h2> :
        props.shownUsers.map(user => <Userbar userInfo={ user } />)
      }
    </div>
  );
}

export default FriendsContent;