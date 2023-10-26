import { useSelector } from "react-redux";
import Userbar from "../Userbar/Userbar";
import './RequestsContent.css';

function RequestsContent(props) {
  const { requests } = useSelector(state => state.requests);

  return (
    <section className="requests-content">
      {
        requests.length > 0 ?
        <section className="friends-field__requests-box">
          <h2 className="friends-field__text">Ваши заявки в друзья:</h2>
          {
            requests.map((friendRequest, index) => <Userbar
              key={ index }
              userInfo={ friendRequest }
              isFriendRequest={ true }
              handleFriend={ props.handleFriend }
            />)
          }
        </section> :
        <h2 className="friends-field__text">У вас нет новых заявок</h2>
      }
    </section>
  )
}

export default RequestsContent;