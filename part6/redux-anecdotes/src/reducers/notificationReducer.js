const notificationReducer = (state = "INITIAL", action) => {
  console.log({state, action})
  switch(action.type) {
    case "SET":
      return action.message
    case "CLEAR":
      return ""
    default:
       return state
  }
}

export const setNotification = (message) => {
  return {
    type: "SET", 
    message
  }
}
 export const clearNotification = () => {
   return {
     type:"CLEAR"
   }
 }

export default notificationReducer