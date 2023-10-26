import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  isLoading: false,
  err: null
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    requestsSetted: (state, { payload: requests }) => ({
      ...state, requests: requests
    }),
    requestAnswered: (state, { payload: userId }) => {
      const newRequests = state.requests.filter(request => request.id !== userId);
      return { ...state, requests: newRequests }
    },
  },
})

export const { actions, reducer } = requestsSlice;