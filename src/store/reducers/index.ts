import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import settings from './settings'

export default combineReducers({
  app,
  user,
  settings
})