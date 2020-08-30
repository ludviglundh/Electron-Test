import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice'
import authReducer from '../auth/authSlice'
import playlistReducer from '../playlist/playlistSlice'
// import persistReducer from '../storage/storageSlice'

export default combineReducers({
  theme: themeReducer,
  auth: authReducer,
  playlist: playlistReducer,
  // persisit: persistReducer,
})
