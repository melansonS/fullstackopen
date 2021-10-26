const notificationReducer = (state = "", action) => {
  console.log({state, action})
  switch(action.type) {
    case "SET_NOTIFICATION":
      return action.message
    case "CLEAR_NOTIFICATION":
      return ""
    default:
       return state
  }
}

let notificationTimeout

export const setNotification = (message, seconds = 5) => {
  return (dispatch) => {
    if(notificationTimeout){
      window.clearTimeout(notificationTimeout)
    }
    dispatch({
      type:"SET_NOTIFICATION",
      message
    })
    notificationTimeout = setTimeout(() => {
      dispatch({type:"CLEAR_NOTIFICATION"})
    }, seconds * 1000)

  }
}

export default notificationReducer