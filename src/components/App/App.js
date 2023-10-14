import * as React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Chat from '../Chat/Chat';
import Contacts from '../Contacts/Contacts';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Friends from '../Friends/Friends';
import Options from '../Options/Options';
import PicturePopup from '../PicturePopup/PicturePopup';
import ChangePhotoPopup from '../ChangePhotoPopup/ChangePhotoPopup';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import ConfirmPhotoPopup from '../ConfirmPhotoPopup/ConfirmPhotoPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/Auth';
import api from '../../utils/Api';
import Notification from '../Notification/Notification';
import ProtectedSignRoutes from '../ProtectedSignRoutes/ProtectedSignRoutes';

function App() {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(true);
  const [ isPageDisplayNone, setIsPageDisplayNone ] = React.useState(true);
  const [ currentUser, setCurrentUser ] = React.useState({
    username: 'Имя',
    avatar: logo,
    status: 'У меня самый лучший статус!'
  });
  const [ picturePopup, setPicturePopup ] = React.useState({ isOpen: false, src: '' });
  const [ changePhotoPopup, setChangePhotoPopup ] = React.useState({ isOpen: false, isOptionsChange: false });
  const [ confirmPhotoPopup, setConfirmPhotoPopup ] = React.useState({ isOpen: false, src: '' });
  const [ signErrorMessage, setSignErrorMessage ] = React.useState('');
  const [ roomInfo, setRoomInfo ] = React.useState({ title: "", avatar: logo });
  const [ signButtonTexts, setSignButtonTexts ] = React.useState({ loginText: 'Войти', regText: 'Зарегистрироваться' });
  const [ notification, setNotification ] = React.useState({ isGood: true, isActive: false, text: "Успешно!" });

  React.useEffect(() => {
    if (localStorage.getItem('access')) {
      auth.validation(localStorage.getItem('access'))
      .then(() => {
        setIsLoggedIn(true);
        handleCurrentUser();
      })
      .catch(() => {
        refreshToken();
      })
      .finally(() => {
        setIsPageDisplayNone(false);
      })
    } else {
      setIsLoggedIn(false);
      setIsPageDisplayNone(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function refreshToken() {
    auth.tokenRefresh(localStorage.getItem('refresh'))
    .then((token) => {
      setIsLoggedIn(true);
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
      handleCurrentUser();
    })
    .catch(() => {
      setIsLoggedIn(false);
      localStorage.clear();
    })
  }

  function handleSignUp(data) {
    auth.signUp(data)
    .then(() => {
      handleSignIn(data);
    })
    .catch((err) => {
      if (err.status === 400) {
        return setSignErrorMessage('Пользователь с таким email уже существует');
      }

      if (err.status === 500) {
        return setSignErrorMessage('На сервере произошла ошибка');
      } else {
        return setSignErrorMessage('Произошла ошибка');
      }
    })
    .finally(() => {
      setSignButtonTexts(state => {
        return { ...state, regText: 'Зарегистрироваться'}
      })
    })
  }

  function handleSignIn(data) {
    auth.signIn(data)
    .then((token) => {
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
      handleCurrentUser();
      setIsLoggedIn(true);
      navigate('/');
    })
    .catch((err) => {
      if (err.status === 401) {
        return setSignErrorMessage('Вы ввели неправильный логин или пароль');
      }

      if (err.status === 500) {
        return setSignErrorMessage('На сервере произошла ошибка');
      } else {
        return setSignErrorMessage('Произошла ошибка');
      }
    })
    .finally(() => {
      setSignButtonTexts(state => {
        return { ...state, loginText: 'Войти'}
      })
    })
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  function handleCurrentUser() {
    auth.getCurrentUser(localStorage.getItem('access'))
    .then((userInfo) => {
      setCurrentUser(state => {
        if (userInfo.status) {
          return userInfo;
        } else {
          return { ...state, username: userInfo.username, avatar: userInfo.avatar, email: userInfo.email, id: userInfo.id };
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function closeAllPopups() {
    setPicturePopup(state => {
      return { ...state, isOpen: false };
    });
    setChangePhotoPopup(state => {
      return { ...state, isOpen: false };
    });
    setConfirmPhotoPopup(state => {
      return { ...state, isOpen: false };
    });
  }
  
  function handleNotification(state) {
    if (state) {
      setNotification({ isGood: true, isActive: true, text: "Успешно!" });
      setTimeout(() => {
        setNotification({ isGood: true, isActive: false, text: "" });
      }, 1500);
    } else {
      setNotification({ isGood: false, isActive: true, text: "Ошибка!" });
      setTimeout(() => {
        setNotification({ isGood: false, isActive: false, text: "" });
      }, 1500);
    }
  }

  function handleChatPhotoChange(roomId) {
    setChangePhotoPopup({ isOptionsChange: true, isOpen: true, roomId: roomId });
  }

  function handleProfilePhotoChange() {
    setChangePhotoPopup({ isOptionsChange: false, isOpen: true });
  }

  function handleChoosePhoto(e) {
    const files = e.target.files;

    if (files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function(e) {
        const formData = new FormData();
        formData.append('avatar', files[0]);

        setConfirmPhotoPopup({ isOpen: true, src: e.target.result, file: formData });
      }
    }

    setChangePhotoPopup(state => {
      return { ...state, isOpen: false };
    });
  }

  function handleConfirmPhoto(file) {
    if (changePhotoPopup.isOptionsChange) {
      api.updateRoomPhoto(changePhotoPopup.roomId, file)
      .then((newRoomInfo) => {
        closeAllPopups();
        setRoomInfo(newRoomInfo);
        handleNotification(true);
      })
      .catch(() => {
        closeAllPopups();
        handleNotification(false);
      })
    } else {
      api.updateUserAvatar(file)
      .then((newUserInfo) => {
        closeAllPopups();
        setCurrentUser(newUserInfo);
        handleNotification(true);
      })
      .catch(() => {
        closeAllPopups();
        handleNotification(false);
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className={ `page ${ isPageDisplayNone ? "display-none" : "" }` }>
        <div className="page__content">
          <Notification notification={ notification } />
          <PicturePopup picturePopup={ picturePopup } closeAllPopups={ closeAllPopups } />
          <ChangePhotoPopup changePhotoPopup={ changePhotoPopup } closeAllPopups={ closeAllPopups } handleChoosePhoto={ handleChoosePhoto } />
          <ConfirmPhotoPopup confirmPhotoPopup={ confirmPhotoPopup } closeAllPopups={ closeAllPopups } handleConfirmPhoto={ handleConfirmPhoto } />
          <Routes>
            <Route path="/chat/:roomId" element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <Chat
                roomInfo={ roomInfo }
              />
            } /> } />
            <Route path='/' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <Contacts handleNotification={ handleNotification } />
            } /> } />
            <Route path='/signin' element={ <ProtectedSignRoutes isLoggedIn={ isLoggedIn } element={
              <Login
                signErrorMessage={ signErrorMessage }
                setSignErrorMessage={ setSignErrorMessage }
                handleSignIn={ handleSignIn }
                signButtonTexts={ signButtonTexts }
                setSignButtonTexts={ setSignButtonTexts }
              />
            } />
            } />
            <Route path='/signup' element={ <ProtectedSignRoutes isLoggedIn={ isLoggedIn } element={
              <Register
                signErrorMessage={ signErrorMessage }
                setSignErrorMessage={ setSignErrorMessage }
                handleSignUp={ handleSignUp }
                signButtonTexts={ signButtonTexts }
                setSignButtonTexts={ setSignButtonTexts }
              />
            } />
            } />
            <Route path='/profile/:userId' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <Profile
                setPicturePopup={ setPicturePopup }
                handleProfilePhotoChange={ handleProfilePhotoChange }
                handleSignOut={ handleSignOut }
                handleNotification={ handleNotification }
                setCurrentUser={ setCurrentUser }
              />
            } /> } />
            <Route path='/friends/:userId' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <Friends />
            } /> } />
            <Route path='/options/:roomId' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <Options
                setPicturePopup={ setPicturePopup }
                setChangePhotoPopup={ setChangePhotoPopup }
                handleChatPhotoChange={ handleChatPhotoChange }
                roomInfo={ roomInfo }
                setRoomInfo={ setRoomInfo }
                handleNotification={ handleNotification }
              />
            } /> } />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
