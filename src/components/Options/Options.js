import * as React from 'react';
import { useParams } from 'react-router-dom';
import './Options.css';
import Header from '../Header/Header';
import OptionsContainer from '../OptionsContainer/OptionsContainer';
import api from '../../utils/Api';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';

function Options(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [ createRoomPopup, setCreateRoomPopup ] = React.useState({ isOpen: false, userList: [] });
  const [ isPageReady, setIsPageReady ] = React.useState(false);
  const [ membersToAdd, setMembersToAdd ] = React.useState([]);
  const { roomId } = useParams();

  React.useEffect(() => {
    api.getRoomInfo(roomId)
    .then((roomInfo) => {
      props.setRoomInfo(roomInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsPageReady(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ roomId ])

  function handleUpdateRoomTitle(roomId, newTitle) {
    api.updateRoomTitle(roomId, newTitle)
    .then((newRoomInfo) => {
      props.setRoomInfo(newRoomInfo);
      props.handleNotification(true);
    })
    .catch(() => {
      props.handleNotification(false);
    })
  }

  function handleOpenCreateRoomPopup() {
    api.getUserFriends(currentUser.id)
    .then((friendList) => {
      setCreateRoomPopup(state => {
        const userList = friendList.results.filter(user => !props.roomInfo.member_set.some(member => member.id === user.id));

        return { ...state, isOpen: true, userList: userList, title: "Добавить участников", buttonText: "Добавить" };
      });
    })
    .catch(err => console.log(err))
  }

  function handleMemberSet(id) {
    if (membersToAdd.some(memberId => memberId === id)) {
      return setMembersToAdd(state => state.splice(state.indexOf(id), 1));
    } else {
      return setMembersToAdd(state => [...state, id]);
    }
  }

  function handleAddMembers() {
    api.addMembersToRoom(membersToAdd, roomId)
    .then((newRoomInfo) => {
      props.handleNotification(true);
      props.setRoomInfo(newRoomInfo);
      setCreateRoomPopup(state => {
        return { ...state, isOpen: false }
      })
    })
    .catch(() => {
      props.handleNotification(false);
    })
  }

  return (
    <>
      <Header />
      <CreateRoomPopup
        createRoomPopup={ createRoomPopup }
        setCreateRoomPopup={ setCreateRoomPopup }
        handleMemberSet={ handleMemberSet }
        membersToAdd={ membersToAdd }
        onButtonClick={ handleAddMembers }
      />
      <main className="content">
        <OptionsContainer
          setPicturePopup={ props.setPicturePopup }
          setChangePhotoPopup={ props.setChangePhotoPopup }
          handleChatPhotoChange={ props.handleChatPhotoChange }
          handleOpenCreateRoomPopup={ handleOpenCreateRoomPopup }
          roomInfo={ props.roomInfo }
          handleUpdateRoomTitle={ handleUpdateRoomTitle }
          roomId={ roomId }
          isPageReady={ isPageReady }
        />
      </main>
    </>
  );
}

export default Options;