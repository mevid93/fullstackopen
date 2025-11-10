import React from 'react'
import filterInvalidDOMProps from 'filter-invalid-dom-props'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { loginAsUser } from '../reducers/loginReducer'
import loginService from '../services/login'
import { Input, Button } from '../styles'

const LoginForm = ({ username, password, ...props }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      props.loginAsUser(user)
      username.reset()
      password.reset()
    } catch (error) {
      props.setNotification('wrong username or password', 'error', 3)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <Input id='username' {...filterInvalidDOMProps(username)} />
        </div>
        <div>
          password <Input id='password' {...filterInvalidDOMProps(password)} />
        </div>
        <Button id='loginbutton' type="submit">login</Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setNotification, loginAsUser })(LoginForm)