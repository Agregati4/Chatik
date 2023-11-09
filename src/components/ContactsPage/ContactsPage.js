import './ContactsPage.css';
import '../App/App.css';
import { useNavigate } from 'react-router-dom';
import ContactsContent from '../ContactsContent/ContactsContent';
import api from '../../utils/Api';
import { useSelector } from 'react-redux';
import AddMembersPopup from '../AddMembersPopup/AddMembersPopup';
import { useEffect, useState } from 'react';
import { useActions } from '../../store/Hooks/useActions';
import Notification from '../Notification/Notification';
import HandleNotification from '../../customFunctions/HandleNotification';
import PageStateQualifier from '../PageStateQualifier/PageStateQualifier';
import ChatMenu from '../ChatMenu/ChatMenu';

function ContactsPage() {
  const { currentUser } = useSelector(state => state.currentUser);
  const navigate = useNavigate();
  const [ shownRooms, setShownRooms ] = useState([]);
  const [ roomsArray, setRoomsArray ] = useState([]);
  const [ membersToAdd, setMembersToAdd ] = useState([]);
  const { popupOpened } = useActions();
  const { handleNotification } = HandleNotification();
  const { isPageReadySetted } = useActions();

  useEffect(() => {
    isPageReadySetted(false);
    api.getRooms()
    .then((rooms) => {
      setShownRooms(rooms.results);
      setRoomsArray(rooms.results);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isPageReadySetted(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ localStorage.getItem('access') ])

  function handleRoomClick(roomId) {
    isPageReadySetted(false);
    navigate(`/chat/${ roomId }`);
  }

  function handleSearchSubmit(inputText) {
    const filtredRooms = roomsArray.filter(room => room.title.toLowerCase().includes(inputText.toLowerCase()));

    setShownRooms(filtredRooms);
  }

  function handleOpenCreateRoomPopup() {
    api.getUserFriends(currentUser.id)
    .then((friendList) => {
      popupOpened({ isOpen: true, userList: friendList.results, title: "Создать беседу", buttonText: "Создать", isTitleNeed: true, key: 'addMembersPopup' });
      setMembersToAdd([]);
    })
    .catch(err => console.log(err))
  }

  function handleMemberSet(id) {
    if (membersToAdd.some(memberId => memberId === id)) {
      return setMembersToAdd(state => state.splice(state.indexOf(id), 1));
    }

    return setMembersToAdd(state => [...state, id]);
  }

  function handleCreateRoom(roomTitle) {
    if (roomTitle === "") {
      roomTitle = "Беседа";
    }

    api.createRoom(membersToAdd, roomTitle)
    .then((newRoomInfo) => {
      navigate(`/chat/${ newRoomInfo.id }`);
      handleNotification(true);
    })
    .catch(() => {
      handleNotification(false);
    })
  }

  return (
    <>
      <AddMembersPopup
        handleCreateRoom={ handleCreateRoom }
        handleMemberSet={ handleMemberSet }
        onButtonClick={ handleCreateRoom }
        membersToAdd={ membersToAdd }
      />
      <Notification />
      <main className="content">
        <section className="contacts-page">
          <ChatMenu
            isContactsPage={ true }
            searchForm={ true }
            optionsButton={ true }
            optionsButtonText="Создать беседу"
            onClickOptionsButton={ handleOpenCreateRoomPopup }
            inputPlaceholder="Поиск"
            handleSearchSubmit={ handleSearchSubmit }
          />
          <PageStateQualifier children={
            <ContactsContent
              shownRooms={ shownRooms }
              handleRoomClick={ handleRoomClick }
            />
          } />
        </section>
      </main>
    </>
  );
}

export default ContactsPage;