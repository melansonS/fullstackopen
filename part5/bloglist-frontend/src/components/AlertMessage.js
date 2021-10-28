import React from 'react'
import { useSelector } from 'react-redux'

const AlertMessage = () => {
  const notification = useSelector(state => state.notification)
  if(!notification) return null
  return <div className={`alert-message ${notification.isError ? 'error' : ''}`}>{notification.message}</div>
}

export default AlertMessage