import { useSelector } from "react-redux";
import Userbar from "../Userbar/Userbar";
import './FriendRequestsContent.css';

function FriendRequestsContent(props) {
  const { requests } = useSelector(state => state.requests);

  return (
    <>
      {
        requests.length > 0 ?
        <div className="friend-requests-content__requests-box">
          <h2 className="friend-requests-content__text">Ваши заявки в друзья:</h2>
          {
            requests.map((friendRequest, index) => <Userbar
              key={ index }
              userInfo={ friendRequest }
              isFriendRequest={ true }
              handleFriend={ props.handleFriend }
            />)
          }
        </div> :
        <h2 className="friend-requests-content__text">У вас нет новых заявок</h2>
      }
    </>
  )
}

export default FriendRequestsContent;