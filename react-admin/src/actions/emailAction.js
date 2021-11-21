import axios from 'axios'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const emailVerify = (token) => async (dispatch) => {
  const res = await axios.get(`${PROXY}user/verify-email?token=${token}`)
  return res
}
