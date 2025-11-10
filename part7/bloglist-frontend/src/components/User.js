import React from 'react'

const User = (props) => {
  if (props.user === undefined) { return null }
  return (
    <div>
      <h2>{props.user.name}</h2>

      <h3>added blogs</h3>

      <ul>
        {props.user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>

    </div>
  )
}

export default User