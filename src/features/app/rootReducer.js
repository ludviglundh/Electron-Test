import {combineReducers} from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice'
import accountReducer from '../account/accountSlice'
import authReducer from '../auth/authSlice'

export default combineReducers({
  theme: themeReducer,
  account: accountReducer,
  auth: authReducer,
})