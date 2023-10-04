import * as React from 'react';
import './Contacts.css';
import '../App/App.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import ContactsContainer from '../ContactsContainer/ContactsContainer';
import api from '../../utils/Api';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';

function Contacts(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [ isPageReady, setIsPageReady ] = React.useState(false);
  const [ createRoomPopup, setCreateRoomPopup ] = React.useState({ isOpen: false, userList: [] });
  const [ shownRooms, setShownRooms ] = React.useState([]);
  const [ roomsArray, setRoomsArray ] = React.useState([]);
  const [ membersToAdd, setMembersToAdd ] = React.useState([]);

  React.useEffect(() => {
    api.getRooms()
    .then((rooms) => {
      setShownRooms(rooms.results);
      setRoomsArray(rooms.results);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsPageReady(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ localStorage.getItem('access') ])

  function handleRoomClick(roomId) {
    setIsPageReady(false);
    navigate(`/chat/${ roomId }`);
  }

  function handleSearchSubmit(inputText) {
    const filtredRooms = roomsArray.filter(room => room.title.toLowerCase().includes(inputText.toLowerCase()));

    setShownRooms(filtredRooms);
  }

  function handleOpenCreateRoomPopup() {
    api.getUserFriends(currentUser.id)
    .then((friendList) => {
      setCreateRoomPopup(state => {
        return { ...state, isOpen: true, userList: friendList.results, title: "Создать беседу", buttonText: "Создать", isTitleNeed: true };
      });
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
      props.handleNotification(true);
    })
    .catch(err => {
      props.handleNotification(false);
    })
  }

  return (
    <>
      <Header />
      <CreateRoomPopup
        createRoomPopup={ createRoomPopup }
        setCreateRoomPopup={ setCreateRoomPopup }
        handleCreateRoom={ handleCreateRoom }
        handleMemberSet={ handleMemberSet }
        onButtonClick={ handleCreateRoom }
        membersToAdd={ membersToAdd }
      />
      <main className="content">
        <ContactsContainer
          handleOpenCreateRoomPopup={ handleOpenCreateRoomPopup }
          shownRooms={ shownRooms }
          handleRoomClick={ handleRoomClick }
          handleSearchSubmit={ handleSearchSubmit }
          isPageReady={ isPageReady }
        />
      </main>
    </>
  );
}

export default Contacts;