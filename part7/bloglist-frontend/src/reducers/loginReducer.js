import blogService from '../services/blogs'
import userService from '../services/users'
import commentService from '../services/comments'

export const initializeLoggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userService.setToken(user.token)
      commentService.setToken(user.token)
    }
    dispatch({
      type: 'INITIALIZE_LOGGED_USER',
      data: user
    })
  }
}

export const loginAsUser = (user) => {
  return async dispatch => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    userService.setToken(user.token)
    commentService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE_LOGGED_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default reducer