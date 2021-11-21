import axios from 'axios'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const PROXY = process.env.REACT_APP_URL + 'api/'
export const userList =
  (page = 1, limit = 10, search = '', type) =>
  async (dispatch) => {
    const res = await axios.get(
      `${PROXY}user/list?page=${page}&limit=${limit}&search=${search}&type=${type}`
    )

    if (type === 3) {
      dispatch({
        type: 'Student_List',
        payload: res.data.result,
      })
    }
    if (type === 2) {
      dispatch({
        type: 'Teacher_List',
        payload: res.data.result,
      })
    }
    if (type === 4) {
      dispatch({
        type: 'Approve_List',
        payload: res.data.result,
      })
    }
  }

export const approvalRequest = (id) => async (dispatch) => {
  const res = await axios.put(`${PROXY}user/approve/${id}`)
  return res
}
