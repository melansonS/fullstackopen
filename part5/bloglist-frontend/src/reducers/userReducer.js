import blogService from '../services/blogs'
import loginService from '../services/login'
import { displayNotification } from './notificationReducer'

const userReducer = (state=null, action) => {
  switch(action.type) {
  case 'INITIALIZE_USER':
    return action.data
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const logUserIn = (credentials) => {
  return async dispatch => {
    try {
      const data = await loginService.login(credentials)
      blogService.setToken(data.token)
      dispatch({ type:'SET_USER',
        data
      })
      dispatch(displayNotification(`successfully logged in as ${credentials.username}`))
      window.localStorage.setItem('user', JSON.stringify(data))
    }
    catch (err) {
      dispatch(displayNotification('wrong username or password', true))
    }
  }
}

export const logUserOut = () => {
  return dispatch => {
    window.localStorage.removeItem('user')
    dispatch( {
      type: 'CLEAR_USER',
    })
    dispatch(displayNotification('Logged Out!'))
  }
}

export const initializeUser = (data) => {
  blogService.setToken(data.token)
  return {
    type:'INITIALIZE_USER',
    data
  }
}

export default userReducer