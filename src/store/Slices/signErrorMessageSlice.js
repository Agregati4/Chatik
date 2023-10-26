import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signErrorMessage: '',
  isLoading: false,
  error: null
}

const signErrorMessages = createSlice({
  name: 'signErrorMessages',
  initialState,
  reducers: {
    signErrorMessageSetted: (state, { payload: errorMessage }) => ({
      ...state, signErrorMessage: errorMessage,
    })
  }
})

export const { actions, reducer } = signErrorMessages;