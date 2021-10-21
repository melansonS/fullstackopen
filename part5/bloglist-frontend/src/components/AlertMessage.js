import React from 'react'

const AlertMessage = ({ message, error }) => {
  return <div className={`alert-message ${error ? 'error' : ''}`}>{message}</div>
}

export default AlertMessage