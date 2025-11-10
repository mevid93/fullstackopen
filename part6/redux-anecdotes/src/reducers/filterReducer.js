export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: {
      filter: content
    }
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.filter
    default:
      return state
  }
}

export default reducer