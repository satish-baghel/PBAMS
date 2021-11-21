const initialState = {
  studentList: {
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

const student = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'Student_List':
      return {
        ...state,
        studentList: payload,
        loading: false,
      }
    default:
      return state
  }
}
export default student
