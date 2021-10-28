import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addBlog({ author, title, url }))
    setAuthor('')
    setTitle('')
    setUrl('')

  }
  return <form onSubmit={handleSubmit}>
    <h2>Create New</h2>
    <div>
      Author:
      <input type="text" id="author" required name="Author" value={author} onChange={(({ target }) => setAuthor(target.value))} />
    </div>
    <div>
      Title:
      <input type="text" id="title" required name="Title" value={title} onChange={(({ target }) => setTitle(target.value))} />
    </div>
    <div>
      Url:
      <input type="text" id="url" name="Url" value={url} onChange={(({ target }) => setUrl(target.value))} />
    </div>
    <button type="submit" id="create-blog-button" >Create</button>
  </form>

}

export default BlogForm