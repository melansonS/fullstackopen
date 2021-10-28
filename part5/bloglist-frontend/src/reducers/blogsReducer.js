import axios from 'axios'
import { displayNotification } from './notificationReducer'

const baseUrl = 'http://localhost:3005/api/blogs'
const token = window.localStorage.getItem('user') ? `bearer ${JSON.parse(window.localStorage.getItem('user')).token}` : null

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.blog)
  default:
    return state
  }
}

export const initializeBlogs = (data) => {
  return {
    type:'INITIALIZE_BLOGS',
    data
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {

      const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } })
      dispatch({
        type:'ADD_BLOG',
        blog: response.data
      })
      dispatch(displayNotification(`a new blog ${blog.title} by ${blog.author} added!`))

    } catch (error) {
      console.log(error)
      dispatch(displayNotification('unable to create blog post...', true))
    }
  }
}

export default blogsReducer