import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import filterInvalidDOMProps from 'filter-invalid-dom-props'

// form for creating new blog
const CreateForm = ({ blogs, setBlogs, setErrorMessage, setInfoMessage, createBlogVisible, setCreateBlogVisible }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title: title.value, author: author.value, url: url.value })
      title.reset()
      author.reset()
      url.reset()
      const updatedBlogs = blogs.concat(blog)
      updatedBlogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(updatedBlogs)
      setInfoMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => setInfoMessage(null), 3000)
    } catch (exception) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title: <input {...filterInvalidDOMProps(title)} />
          </div>
          <div>
            author: <input {...filterInvalidDOMProps(author)} />
          </div>
          <div>
            url: <input {...filterInvalidDOMProps(url)} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

// Form for log in
const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <div>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          username <input {...filterInvalidDOMProps(username)} />
        </div>
        <div>
          password <input {...filterInvalidDOMProps(password)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export { CreateForm, LoginForm }