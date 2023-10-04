import * as React from 'react';
import './ContactsContainer.css';
import '../App/App.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import ContactsField from '../ContactsField/ContactsField';
import Preloader from '../Preloader/Preloader';

function ContactsContainer(props) {
  return (
    <section className="contacts-container">
      {
        props.isPageReady ?
        <>
          <ChatMenu
            isContactsPage={ true }
            searchForm={ true }
            optionsButton={ true }
            optionsButtonText="Создать беседу"
            onClickOptionsButton={ props.handleOpenCreateRoomPopup }
            inputPlaceholder="Поиск"
            handleSearchSubmit={ props.handleSearchSubmit }
          />
          <ContactsField
            isContactsPage={ true }
            shownRooms={ props.shownRooms }
            handleRoomClick={ props.handleRoomClick }
          />
        </> :
        <>
          <ChatMenu
            isContactsPage={ true }
            searchForm={ true }
            optionsButton={ true }
            optionsButtonText="Создать беседу"
            onClickOptionsButton={ props.handleOpenCreateRoomPopup }
            inputPlaceholder="Поиск"
            handleSearchSubmit={ props.handleSearchSubmit }
          />
          <Preloader />
        </>
      }
    </section>
  );
}

export default ContactsContainer;