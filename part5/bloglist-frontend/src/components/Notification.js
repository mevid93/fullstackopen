import React from 'react'
import './Notification.css'

const InfoNotification = ({ msg }) => {
  return (<p className="notification">{msg}</p>)
}

const ErrorNotification = ({ msg }) => {
  return (<p className="error">{msg}</p>)
}

export { InfoNotification, ErrorNotification }