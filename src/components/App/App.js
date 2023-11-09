import { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import ChatPage from '../ChatPage/ChatPage';
import ContactsPage from '../ContactsPage/ContactsPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProfilePage from '../ProfilePage/ProfilePage';
import FriendsPage from '../FriendsPage/FriendsPage';
import RoomOptionsPage from '../RoomOptionsPage/RoomOptionsPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedSignRoutes from '../ProtectedSignRoutes/ProtectedSignRoutes';
import FriendRequestsPage from '../FriendRequestsPage/FriendRequestsPage';
import UserValidation from '../../customFunctions/UserValidation';
import Header from '../Header/Header';

function App() {
  const location = useLocation();
  const { isPageDisplayNone, validation } = UserValidation();

  useEffect(() => {
    validation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location.pathname ])

  return (
    <div className={ `page ${ isPageDisplayNone ? "display-none" : "" }` }>
      <div className="page__content">
        <Header />
        <Routes>
          <Route path="/chat/:roomId" element={ <ProtectedRoute element={
            <ChatPage />
          } /> } />
          <Route path='/' element={ <ProtectedRoute element={
            <ContactsPage />
          } /> } />
          <Route path='/signin' element={ <ProtectedSignRoutes element={
            <Login />
          } /> } />
          <Route path='/signup' element={ <ProtectedSignRoutes element={
            <Register />
          } /> } />
          <Route path='/profile/:userId' element={ <ProtectedRoute element={
            <ProfilePage />
          } /> } />
          <Route path='/friends/:userId' element={ <ProtectedRoute element={
            <FriendsPage />
          } /> } />
          <Route path='/options/:roomId' element={ <ProtectedRoute element={
            <RoomOptionsPage />
          } /> } />
          <Route path='/requests/:userId' element={ <ProtectedRoute element={
            <FriendRequestsPage />
          } /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
