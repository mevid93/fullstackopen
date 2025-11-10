import blogService from '../services/blogs'
import commentService from '../services/comments'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => { return b.likes - a.likes })
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blog = await blogService.create({ title, author, url })
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogObject = {
      title: blog.title,
      auhtor: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    const updatedBlog = await blogService.update(blogObject)
    updatedBlog.comments = blog.comments // quick fix
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const commentBlog = (content, blog_id) => {
  return async dispatch => {
    const commentObject = {
      content
    }
    const savedComment = await commentService.create(commentObject, blog_id)
    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        comment: savedComment,
        blog_id: blog_id
      }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        id
      }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data.blogs
    case 'CREATE_BLOG': {
      const concatedBlogs = state.concat(action.data)
      return concatedBlogs.sort((a, b) => { return b.likes - a.likes })
    }
    case 'LIKE_BLOG': {
      const updatedBlogs = state.map(b => b.id !== action.data.id ? b : action.data)
      return updatedBlogs.sort((a, b) => { return b.likes - a.likes })
    }
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'COMMENT_BLOG': {
      const blog = state.find(b => b.id === action.data.blog_id)
      blog.comments = blog.comments.concat(action.data.comment)
      return state.map(b => b.id !== blog.id ? b : blog)
    }
    default:
      return state
  }
}

export default reducer