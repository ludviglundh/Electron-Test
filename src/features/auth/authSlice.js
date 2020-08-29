import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  access_token: null,
}

function setAuthAccessToken(state, action) {
  const accessToken = action.payload
  state.access_token = accessToken
}

function setAuthIsAuthenticated(state, action) {
  const isAuthenticated = action.payload
  state.isAuthenticated = isAuthenticated
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: setAuthAccessToken,
    setIsAuthenticated: setAuthIsAuthenticated,
  },
})

export const { setAccessToken, setIsAuthenticated } = authSlice.actions
export default authSlice.reducer
