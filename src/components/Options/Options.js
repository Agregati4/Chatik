import * as React from 'react';
import { useParams } from 'react-router-dom';
import './Options.css';
import Header from '../Header/Header';
import OptionsContainer from '../OptionsContainer/OptionsContainer';
import api from '../../utils/Api';
import CreateRoomPopup from '../AddMembersPopup/AddMembersPopup';
import { useSelector } from 'react-redux';
import PicturePopup from '../PicturePopup/PicturePopup';
import { useActions } from '../../store/Hooks/useActions';
import SelectPhotoPopup from '../SelectPhotoPopup/SelectPhotoPopup';
import ConfirmPhotoPopup from '../ConfirmPhotoPopup/ConfirmPhotoPopup';
import Notification from '../Notification/Notification';
import HandleNotification from '../../customFunctions/HandleNotification';

function Options(props) {
  const { currentUser } = useSelector(state => state.currentUser);
  const [ isPageReady, setIsPageReady ] = React.useState(false);
  const [ membersToAdd, setMembersToAdd ] = React.useState([]);
  const { roomId } = useParams();
  const selectPhotoPopup = useSelector(state => state.popups.find(popup => popup.key === 'selectPhotoPopup'));
  const { popupOpened, popupClosed } = useActions();
  const { handleNotification } = HandleNotification();
  const { roomInfoSetted } = useActions();

  React.useEffect(() => {
    api.getRoomInfo(roomId)
    .then((roomInfo) => {
      roomInfoSetted(roomInfo);
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
      roomInfoSetted(newRoomInfo);
      handleNotification(true);
    })
    .catch(() => {
      handleNotification(false);
    })
  }

  function handleOpenCreateRoomPopup() {
    api.getUserFriends(currentUser.id)
    .then((friendList) => {
      const userList = friendList.results.filter(user => !props.roomInfo.member_set.some(member => member.id === user.id));

      popupOpened({ isOpen: true, userList: userList, title: "Добавить участников", buttonText: "Добавить", key: 'addMembersPopup' });
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
      handleNotification(true);
      roomInfoSetted(newRoomInfo);
      popupClosed('addMembersPopup');
    })
    .catch(() => {
      handleNotification(false);
    })
  }

  function handleConfirmPhotoChange(file) {
    api.updateRoomPhoto(selectPhotoPopup.roomId, file)
    .then((newRoomInfo) => {
      popupClosed('confirmPhotoPopup');
      roomInfoSetted(newRoomInfo);
      handleNotification(true);
    })
    .catch(() => {
      popupClosed('confirmPhotoPopup');
      handleNotification(false);
    })
  }

  return (
    <>
      <Header />
      <CreateRoomPopup
        handleMemberSet={ handleMemberSet }
        membersToAdd={ membersToAdd }
        onButtonClick={ handleAddMembers }
      />
      <PicturePopup />
      <SelectPhotoPopup />
      <ConfirmPhotoPopup handleConfirmPhotoChange={ handleConfirmPhotoChange } />
      <Notification />
      <main className="content">
        <OptionsContainer
          handleOpenCreateRoomPopup={ handleOpenCreateRoomPopup }
          handleUpdateRoomTitle={ handleUpdateRoomTitle }
          roomId={ roomId }
          isPageReady={ isPageReady }
        />
      </main>
    </>
  );
}

export default Options;