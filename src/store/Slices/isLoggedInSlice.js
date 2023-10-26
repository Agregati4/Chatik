import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  isLoading: false,
  error: null
}

const isLoggedIn = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    isLoggedInSetted: (state, { payload: isLoggedInState }) => ({
      ...state, isLoggedIn: isLoggedInState 
    })
  }
})

export const { actions, reducer } = isLoggedIn;