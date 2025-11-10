import React from 'react'
import './Notification.css'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification === null || notification.type === null) {
    return null
  }
  else if (notification.type === 'info') {
    return (<p className="notification">{notification.content}</p>)
  }
  else if (notification.type === 'error') {
    return (<p className="error">{notification.content}</p>)
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)