const notificationReducer = (state=null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.notification.message, isError: action.notification.isError }
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

let notificationTimeout

export const displayNotification = (message, isError) => {
  return async dispatch => {
    if(notificationTimeout) {
      window.clearTimeout(notificationTimeout)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        isError
      }
    })
    notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 5000)
  }

}

export default notificationReducer