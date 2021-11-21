import axios from 'axios'
import { setAlert } from './alertAction'
import setAuthToken from '../Helpers/setAuthToken.js'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const PROXY = process.env.REACT_APP_URL + 'api/'

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get(`${PROXY}user/auth`)
    dispatch({
      type: 'Load_User',
      payload: res.data.result,
    })
  } catch (err) {
    dispatch({
      type: 'Auth_Fail',
    })
  }
}

export const login = (userObj) => async (dispatch) => {
  const body = JSON.stringify(userObj)
  try {
    const res = await axios.post(PROXY + 'user/login', body, config)

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
    })
    if (error.response !== undefined) {
      console.log(error.response.data.message)
      dispatch(setAlert(error.response.data.message, 'danger'))
    } else {
      dispatch(setAlert('Error occurred, Please try again later', 'danger'))
    }
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  })
}

export const register = (data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.post(`${PROXY}user`, body, config)
  return res
}
