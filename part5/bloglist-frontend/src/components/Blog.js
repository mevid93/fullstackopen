import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const showWhenAllInfo = { display: showAllInfo ? '' : 'none' }
  const createdByLoggedUser = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      auhtor: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    const updatedBlog = await blogService.update(blogObject)
    const updatedBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
    setBlogs(updatedBlogs.sort((a, b) => { return b.likes - a.likes }))
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div className="clickableDiv" style={blogStyle} onClick={() => setShowAllInfo(!showAllInfo)}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenAllInfo}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        <button style={createdByLoggedUser} onClick={handleRemove}>remove</button>
      </div>
    </div >
  )

}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default Blog