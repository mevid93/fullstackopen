import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        blog has {blog.likes} likes
        <button className="likeButton" onClick={onClick}>like</button>
      </div>
    </div>
  )
}

export default SimpleBlog