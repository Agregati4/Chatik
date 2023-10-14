import * as React from 'react';
import './ContactsField.css';
import '../App/App.css';
import RoomBar from '../RoomBar/RoomBar';

function ContactsField(props) {
  return (
    <div className="contacts-field">
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

export default ContactsField;