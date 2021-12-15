import axios from 'axios'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const PROXY = process.env.REACT_APP_URL + 'api/'

export const getAllCertificate = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    `${PROXY}certificate?search=${search}&page=${page}&limit=${limit}`
  )
  dispatch({
    type: 'GET_ALL_CERTIFICATE',
    payload: res.data.result,
  })
}

export const addCertificate = (data) => async (dispatch) => {
  const res = await axios.post(`${PROXY}certificate`, data)
  return res
}

export const updateCertificate = (id, data) => async (dispatch) => {
  const res = await axios.put(`${PROXY}certificate/${id}`, data)
  return res
}

export const deleteCertificate = (id, data) => async (dispatch) => {
  const res = await axios.delete(`${PROXY}certificate/${id}`)
  return res
}
