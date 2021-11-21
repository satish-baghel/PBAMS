const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  admin: null,
}
export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'Load_User':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
      }
    case 'Auth_Fail':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: null,
      }
    default:
      return state
  }
}
