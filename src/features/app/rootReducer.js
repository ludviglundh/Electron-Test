import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice'
import accountReducer from '../account/accountSlice'
import authReducer from '../auth/authSlice'
import playlistReducer from '../playlist/playlistSlice'
// import persistReducer from '../storage/storageSlice'

export default combineReducers({
  theme: themeReducer,
  account: accountReducer,
  auth: authReducer,
  playlist: playlistReducer,
  // persisit: persistReducer,
})
