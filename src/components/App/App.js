import { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Contacts from '../Contacts/Contacts';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Friends from '../Friends/Friends';
import Options from '../Options/Options';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedSignRoutes from '../ProtectedSignRoutes/ProtectedSignRoutes';
import RequestsPage from '../RequestsPage/RequestsPage';
import UserValidation from '../../customFunctions/UserValidation';

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
        <Routes>
          <Route path="/chat/:roomId" element={ <ProtectedRoute element={
            <Chat />
          } /> } />
          <Route path='/' element={ <ProtectedRoute element={
            <Contacts />
          } /> } />
          <Route path='/signin' element={ <ProtectedSignRoutes element={
            <Login />
          } />
          } />
          <Route path='/signup' element={ <ProtectedSignRoutes element={
            <Register />
          } />
          } />
          <Route path='/profile/:userId' element={ <ProtectedRoute element={
            <Profile />
          } /> } />
          <Route path='/friends/:userId' element={ <ProtectedRoute element={
            <Friends />
          } /> } />
          <Route path='/options/:roomId' element={ <ProtectedRoute element={
            <Options />
          } /> } />
          <Route path='/requests/:userId' element={ <ProtectedRoute element={
            <RequestsPage />
          } /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
