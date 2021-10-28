import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
  case 'ADD_COMMENT':
    return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.blog.id)
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
      const newBlog = await blogService.create(blog)
      dispatch({
        type:'ADD_BLOG',
        blog: newBlog
      })
      dispatch(displayNotification(`a new blog ${blog.title} by ${blog.author} added!`))

    } catch (error) {
      console.log(error)
      dispatch(displayNotification('unable to create blog post...', true))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.like(blog)
      dispatch({
        type:'LIKE_BLOG',
        blog: likedBlog
      })
    } catch (err) {
      console.log(err)
      dispatch(displayNotification('unable to like this blog post...', true))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      dispatch({
        type:'ADD_COMMENT',
        blog: updatedBlog
      })
    } catch(err) {
      console.log(err)
      dispatch(displayNotification('unable to add a comment to this blog post...', true))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      const deletedBlog = await blogService.deleteBlog(blog)
      dispatch({
        type:'DELETE_BLOG',
        blog: deletedBlog
      })
      dispatch(displayNotification(`blog '${blog.title}' has been deleted`))

    } catch (err) {
      console.log(err)
      dispatch(displayNotification('unable to like this blog post...', true))
    }
  }
}

export default blogsReducer