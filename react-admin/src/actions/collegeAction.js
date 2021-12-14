import axios from 'axios'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const PROXY = process.env.REACT_APP_URL + 'api/'

export const collegeDropDown = () => async (dispatch) => {
  const res = await axios.get(`${PROXY}college/drop-down`)
  return res
}

export const getAllCollege = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    `${PROXY}college?search=${search}&page=${page}&limit=${limit}`
  )
  dispatch({
    type: 'GET_ALL_COLLEGE',
    payload: res.data.result,
  })
}

export const addCollege = (data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.post(`${PROXY}college`, body, config)
  return res
}

export const updateCollege = (id, data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.put(`${PROXY}college/${id}`, body, config)
  return res
}

export const statusChangeCollege = (id, data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.put(
    `${PROXY}college/change-status/${id}`,
    body,
    config
  )
  return res
}
