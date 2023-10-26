import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { isOpen: false, src: '', key: 'picturePopup' },
  { isOpen: false, key: 'selectPhotoPopup' },
  { isOpen: false, src: '', key: 'confirmPhotoPopup' },
  { isOpen: false, key: 'editProfilePopup' },
  { isOpen: false, key: 'confirmPopup' },
  { isOpen: false, userList: [], key: 'addMembersPopup' },
]

const popupsSlice = createSlice({
  name: 'popupsSlice',
  initialState,
  reducers: {
    popupClosed: (state, { payload: popupName }) => {
      return state.map(popup => {
        if (popup.key === popupName) {
          return { ...popup, isOpen: false }
        }
        return popup;
      })
    },
    popupOpened: (state, { payload: popupData }) => {
      return state.map(popup => {
        if (popup.key === popupData.key) {
          return popupData;
        }
        return popup;
      })
    }
  }
})

export const { actions, reducer } = popupsSlice;