import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Api/api.Slice";
import { reducer as currentUserReducer } from "./Slices/currentUserSlice";
import { reducer as requestReducer } from "./Slices/requestsSlice";
import { reducer as isLoggedInReducer } from "./Slices/isLoggedInSlice";
import { reducer as signErrorMessageReducer } from "./Slices/signErrorMessageSlice";
import { reducer as signButtonTextsReducer } from "./Slices/signButtonTextsSlice";
import { reducer as popupsReducer } from "./Slices/popupsSlice";
import { reducer as notificationReducer } from "./Slices/notificationSlice";
import { reducer as roomInfoReducer } from "./Slices/roomInfoSlice";
import { reducer as isPageReadyReducer } from "./Slices/isPageReadySlice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  requests: requestReducer,
  isLoggedIn: isLoggedInReducer,
  signErrorMessage: signErrorMessageReducer,
  signButtonTexts: signButtonTextsReducer,
  popups: popupsReducer,
  notification: notificationReducer,
  roomInfo: roomInfoReducer,
  isPageReady: isPageReadyReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;