import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async (blog) => {
  const newBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = { headers : { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const blogService = {
  getAll,
  create,
  setToken,
  like,
  deleteBlog
}

export default blogService