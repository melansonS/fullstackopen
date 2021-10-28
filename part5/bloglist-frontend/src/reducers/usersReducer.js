const usersReducer = (state=[], action) => {
  switch (action.type) {
  case 'INITIALIZE_USERS':
    return action.users
  default:
    return state
  }
}


export const initializeUsers = (users) => {
  return async dispatch => {
    dispatch({
      type: 'INITIALIZE_USERS',
      users
    })
  }

}

export default usersReducer