import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPlaylists: [],
  selectedPlaylist: null,
}

function savePlaylists(state, action) {
  const savedPlaylists = action.payload
  state.savedPlaylists = savedPlaylists
}

function setPlaylist(state, action) {
  const activePlaylist = action.payload
  state.selectedPlaylist = activePlaylist
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    saveUserPlaylists: savePlaylists,
    setActivePlaylist: setPlaylist,
  },
})

export const { setActivePlaylist, saveUserPlaylists } = playlistSlice.actions

export default playlistSlice.reducer
