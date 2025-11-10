import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {

  useEffect(() => {
    props.initializeUsers()
  }, [])

  const rows = () => {
    if (props.users.length === 0) {
      return null
    }
    return (
      props.users.map(u =>
        <tr key={u.id}>
          <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
          <td>{u.blogs.length}</td>
        </tr>)
    )
  }

  return (
    <div>
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <td></td>
              <td><strong>blogs created</strong></td>
            </tr>
          </thead>
          <tbody>
            {rows()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchesToProps = {
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchesToProps)(UserList)