import { useState } from "react";
import { useActions } from "../store/Hooks/useActions";
import auth from "../utils/Auth";
import { useLazyGetCurrentUserQuery } from "../store/Api/api.Slice";
import { useLazyGetRequestsQuery } from "../store/Api/api.Requests/api.Requests";

export default function UserValidation() {
  const { isLoggedInSetted, currentUserSetted, requestsSetted } = useActions();
  const [ isPageDisplayNone, setIsPageDisplayNone ] = useState(true);
  const [ getCurrentUser ] = useLazyGetCurrentUserQuery();
  const [ getRequests ] = useLazyGetRequestsQuery();

  function validation() {
    if (localStorage.getItem('access')) {
      auth.validation()
      .then(() => {
        isLoggedInSetted(true);
        handleCurrentUser();
        getFriendRequests();
      })
      .catch(() => {
        refreshToken();
      })
      .finally(() => {
        setIsPageDisplayNone(false);
      })
    } else {
      isLoggedInSetted(false);
      setIsPageDisplayNone(false);
    }
  }

  function handleCurrentUser() {
    getCurrentUser()
    .unwrap()
    .then((userInfo) => {
      currentUserSetted(userInfo);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function refreshToken() {
    auth.tokenRefresh()
    .then((token) => {
      isLoggedInSetted(true);
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
      handleCurrentUser();
      getFriendRequests();
    })
    .catch(() => {
      isLoggedInSetted(false);
      localStorage.clear();
    })
  }

  function getFriendRequests() {
    getRequests()
    .then(requestList => {
      requestsSetted(requestList.data.results);
    })
    .catch(err => console.log(err))
  }

  return { isPageDisplayNone, validation, handleCurrentUser }
}