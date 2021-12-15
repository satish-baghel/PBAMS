const initialState = {
  certificateList: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  loading: true,
}

const certificate = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_ALL_CERTIFICATE':
      return {
        ...state,
        certificateList: payload,
        loading: false,
      }
    default:
      return state
  }
}
export default certificate
