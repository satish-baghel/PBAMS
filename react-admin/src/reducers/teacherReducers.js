const initialState = {
  teacherList: {
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

const teacher = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'Teacher_List':
      return {
        ...state,
        teacherList: payload,
        loading: false,
      }
    default:
      return state
  }
}
export default teacher
