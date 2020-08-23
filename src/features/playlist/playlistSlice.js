import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPlaylist: null,
}

function setPlaylist(state, action) {
  console.log('hej')
  const selectedPlaylist = action.payload
  state.selectedPlaylist = selectedPlaylist
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    changeSelectedPlaylist: setPlaylist,
  },
})

export const { changeSelectedPlaylist } = playlistSlice.actions

export default playlistSlice.reducer
