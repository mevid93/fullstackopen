import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedUser, logoutUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { useField } from './hooks'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import { Page, Navigation, Button, Footer } from './styles'


const Blogs = () => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  return (
    <div>
      <CreateForm
        createBlogVisible={createBlogVisible}
        setCreateBlogVisible={setCreateBlogVisible}
      />
      <BlogList />
    </div>
  )
}

const Users = () => {
  return (
    <UserList />
  )
}

function App(props) {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeLoggedUser()
  }, [])

  const handleLogout = () => {
    props.logoutUser()
  }

  const userById = (id) => props.users.find(user => user.id === id)

  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  const padding = {
    padding: 5
  }

  return (
    <Page>
      <Router>
        <Navigation>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {props.user && <em style={padding}>{`${props.user.name} logged in`}</em>}
          {props.user ? <Button onClick={handleLogout}>logout</Button> : <Link to="/login">login</Link>}
        </Navigation>

        {props.user ? <h2>blog app</h2> : <h2>log in to application</h2>}
        <Notification />

        <div>
          <Route exact path="/" render={() => props.user && <Blogs />} />
          <Route exact path="/blogs/:id" render={({ match }) => props.user && <Blog blog={blogById(match.params.id)} />} />
          <Route exact path="/users" render={() => props.user && <Users />} />
          <Route exact path="/users/:id" render={({ match }) => props.user && <User user={userById(match.params.id)} />} />
          <Route path="/login" render={() => props.user ? <Redirect to="/" /> : <LoginForm username={username} password={password} />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </div>
      </Router>

      <Footer>
        <em>Blog app, MOOC 2019</em>
      </Footer>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchesToProps = {
  setNotification,
  initializeBlogs,
  initializeLoggedUser,
  logoutUser
}

export default connect(mapStateToProps, mapDispatchesToProps)(App)
