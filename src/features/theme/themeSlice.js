import { createSlice } from '@reduxjs/toolkit'

import { THEME_NAMES } from '../app/constants'

const initialState = {
  selectedTheme: THEME_NAMES.dark,
}

function changeTheme(state, action) {
  const selectedTheme = action.payload
  state.selectedTheme = selectedTheme
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeSelectedTheme: changeTheme,
  },
})

export const { changeSelectedTheme } = themeSlice.actions

export default themeSlice.reducer
