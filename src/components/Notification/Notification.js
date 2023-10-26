import { useSelector } from 'react-redux';
import './Notification.css';

function Notification() {
  const { notification } = useSelector(state => state.notification);

  return (
    <p className={
      `notification
      ${ notification.isGood ? "notification_good" : ""}
      ${ notification.isActive ? "notification_active" : ""}`
    }>{ notification.text }</p>
  )
}

export default Notification;