import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogsReducer'
import { useHistory, useParams } from 'react-router'
const Blog = () => {
  const [newComment, setNewComment] = useState('')
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === params.id))
  const user = useSelector(state => state.user)

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirmation) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, newComment))
    setNewComment('')
  }

  const renderDeleteButton = () => {
    if(blog.user && blog.user.username === user.username) {
      return <button className="delete-button" onClick={handleDelete}>Delete</button>
    } else {
      return null
    }
  }

  return (
    <div className="blog-container">
      {blog ? (<>
        <div>
          <h2>{blog.title} {blog.author}</h2>
        </div>
        <a className="url" href={blog.url} >{blog.url}</a>
        <div className="likes">
          {blog.likes} likes
          <button onClick={handleLike} className="like-button">like</button>
        </div>
        <div>add by {blog.user.name}</div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)}></input>
          <input type="submit" value="add comment"></input>
        </form>
        {blog.comments && blog.comments.length >= 1 && (
          <div>
            <ul>
              {blog.comments.map((comment, index) => <li key={`${index}-${comment[0]}`}>{comment}</li>)}
            </ul>
          </div>
        )}
        {renderDeleteButton()}
      </>)
        :
        <div>Blog not found...</div>
      }

    </div>)
}

export default Blog