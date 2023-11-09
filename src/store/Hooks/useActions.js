import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as currentUserActions } from "../Slices/currentUserSlice";
import { actions as requestsActions } from '../Slices/requestsSlice';
import { actions as isLoggedInActions } from "../Slices/isLoggedInSlice";
import { actions as signErrorMessageActions } from "../Slices/signErrorMessageSlice";
import { actions as signButtonTextsActions } from "../Slices/signButtonTextsSlice";
import { actions as popupsActions } from "../Slices/popupsSlice";
import { actions as notificationActions } from "../Slices/notificationSlice";
import { actions as roomInfoActions } from "../Slices/roomInfoSlice";
import { actions as isPageReadyActions } from "../Slices/isPageReadySlice";

const rootActions = {
  ...currentUserActions,
  ...requestsActions,
  ...isLoggedInActions,
  ...signErrorMessageActions,
  ...signButtonTextsActions,
  ...popupsActions,
  ...notificationActions,
  ...roomInfoActions,
  ...isPageReadyActions,
}

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}