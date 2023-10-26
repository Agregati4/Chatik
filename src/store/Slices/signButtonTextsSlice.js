import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signButtonTexts: {
    loginText: 'Войти',
    regText: 'Зарегистрироваться',
  },
  isLoading: false,
  error: null
}

const signButtonTexts = createSlice({
  name: 'signButtonTexts',
  initialState,
  reducers: {
    loginButtonTextSetted: (state, { payload: loginText }) => ({
      ...state, signButtonTexts: { ...state.signButtonTexts, loginText }
    }),
    registerButtonTextSetted: (state, { payload: regText }) => ({
      ...state, signButtonTexts: { ...state.signButtonTexts, regText }
    })
  }
})

export const { actions, reducer } = signButtonTexts;