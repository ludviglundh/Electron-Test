import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seletedPlaylist: null
};

function setPlaylist(state, action) {
  const selectedTheme = action.payload;
  state.selectedTheme = selectedTheme;
}

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    changePlaylist: setPlaylist,
  },
});

export const { changePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
