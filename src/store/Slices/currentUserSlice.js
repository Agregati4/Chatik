import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    username: 'Имя',
    avatar: '',
    status: 'У меня самый лучший статус!',
    id: 0,
  },
  isLoading: false,
  err: null
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    currentUserSetted: (state, { payload: currentUser }) => ({
      ...state, currentUser: currentUser
    })
  },
})

export const { actions, reducer } = currentUserSlice;