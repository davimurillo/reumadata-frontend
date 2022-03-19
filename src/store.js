import { configureStore } from '@reduxjs/toolkit'
import user from './services/session/slice'
import core from './services/core/slice'

export default configureStore({
  reducer: {
    user: user,
    core: core
  },
})