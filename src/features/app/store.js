import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export function initializeStore(preloadedState) {
  return (
    configureStore({
      reducer: rootReducer,
      preloadedState
    })
  )
}