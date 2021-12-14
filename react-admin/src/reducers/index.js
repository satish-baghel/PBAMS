import { combineReducers } from 'redux'
import authReducers from './authReducers.js'
import alertReducers from './alertReducer'
import studentReducers from './studentReducers'
import teacherReducers from './teacherReducers'
import approveReducer from './approveReducer'
import collegeReducers from './collegeReducer'

export default combineReducers({
  auth: authReducers,
  alert: alertReducers,
  student: studentReducers,
  teacher: teacherReducers,
  approve: approveReducer,
  college: collegeReducers,
})
