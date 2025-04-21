import { configureStore } from '@reduxjs/toolkit'
import pastesReducer from './redux/pasteSlice'

export const store = configureStore({
  reducer: {
    paste: pastesReducer,
  },
})