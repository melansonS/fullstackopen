import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthor('')
    setTitle('')
    setUrl('')
    createBlog(({ author, title, url }))
  }
  return <form onSubmit={handleSubmit}>
    <div>
      Author:
      <input type="text" required name="Author" value={author} onChange={(({ target }) => setAuthor(target.value))} />
    </div>
    <div>
      Title:
      <input type="text" required name="Title" value={title} onChange={(({ target }) => setTitle(target.value))} />
    </div>
    <div>
      Url:
      <input type="text" name="Url" value={url} onChange={(({ target }) => setUrl(target.value))} />
    </div>
    <button type="submit" >Create</button>
  </form>

}

export default BlogForm