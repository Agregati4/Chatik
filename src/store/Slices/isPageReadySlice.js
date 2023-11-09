import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageReady: false,
  isLoading: false,
  error: null,
}

const isPageReady = createSlice({
  name: 'isPageReady',
  initialState,
  reducers: {
    isPageReadySetted: (state, { payload: pageState }) => ({
      ...state, isPageReady: pageState,
    })
  }
})

export const { actions, reducer } = isPageReady;