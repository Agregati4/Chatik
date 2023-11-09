import './ContactsContent.css';
import '../App/App.css';
import RoomBar from '../RoomBar/RoomBar';

function ContactsContent(props) {
  return (
    <div className="contacts-content">
      {
        props.shownRooms.map((room, index) => <RoomBar
          key={ index }
          id={ room.id }
          roomInfo={ room }
          isContactsPage={ props.isContactsPage }
          onClick={ props.handleRoomClick }
        />)
      }
    </div>
  );
}

export default ContactsContent;