import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    isGood: true,
    isActive: false,
    text: "Успешно!"
  },
  isLoading: false,
  error: null,
}

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSetted: (state, { payload: notificationOptions }) => ({
      ...state, notification: notificationOptions,
    }),
    notificationClosed: (state) => ({
      ...state, notification: { ...state.notification, isActive: false },
    })
  }
})

export const { actions, reducer } = notification;