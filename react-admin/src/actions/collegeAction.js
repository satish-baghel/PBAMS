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
