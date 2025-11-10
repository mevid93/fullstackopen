import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import filterInvalidDOMProps from 'filter-invalid-dom-props'
import { Button, Input } from '../styles'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, ...props }) => {
  const content = useField('text')

  if (blog === undefined) { return null }

  const user = props.user
  const createdByLoggedUser = { display: user.username === blog.user.username ? '' : 'none' }

  const handleLike = async () => {
    props.likeBlog(blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog.id)
      props.setNotification(`removed blog ${blog.title} by ${blog.author}`, 'info', 3)
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    if (content.value !== '') {
      props.commentBlog(content.value, blog.id)
    }
    content.reset()
  }

  return (
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <Button id='likeblogbutton' onClick={handleLike}>like</Button></div>
        <div>added by {blog.user.name}</div>
        <Button id='removeblogbutton' style={createdByLoggedUser} onClick={handleRemove}>remove</Button>
      </div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <Input id='commentfield' {...filterInvalidDOMProps(content)} />
          <Button id='addcommentbutton' type="submit">add comment</Button>
        </div>
      </form>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div >
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { likeBlog, removeBlog, commentBlog, setNotification })(Blog)