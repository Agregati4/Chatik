import * as React from 'react';
import './ContactsField.css';
import '../App/App.css';
import ContactBar from '../ContactBar/ContactBar';

function ContactsField(props) {
  return (
    <div className="contacts-field">
      { props.shownRooms.map((room, index) => <ContactBar
        key={ index }
        id={ room.id }
        roomInfo={ room }
        isContactsPage={ props.isContactsPage }
        onClick={ props.handleRoomClick }
      />) }
    </div>
  );
}

export default ContactsField;