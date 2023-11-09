import { createSlice } from "@reduxjs/toolkit";
import logo from '../../images/logo.svg';

const initialState = {
  roomInfo: {
    title: '',
    avatar: logo,
    member_set: [],
  },
  isLoading: false,
  error: null,
}

const roomInfo = createSlice({
  name: 'roomInfo',
  initialState,
  reducers: {
    roomInfoSetted: (state, { payload: newRoomInfo }) => ({
      ...state, roomInfo: { ...state, ...newRoomInfo },
    })
  }
})

export const { actions, reducer } = roomInfo;
