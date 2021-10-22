import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component
  const mockLikeBlog = jest.fn()
  beforeEach(() => {
    const username = 'tom'
    const handleDelete = () => {console.log('running handle delete')}
    const blog = {
      author: 'testin',
      title: 'this blog post',
      url: 'http://realUrl.com',
      likes: 3
    }
    component = render(
      <Blog
        blog={blog}
        username={username}
        handleLike={mockLikeBlog}
        handleDelete={handleDelete}
      />
    )
  })
  test('renders title and author, but not url and likes until shown', () => {
    const urlP = component.container.querySelector('.url')
    const likesDiv = component.container.querySelector('.likes')
    expect(component.container).toHaveTextContent('this blog post')
    expect(component.container).toHaveTextContent('testin')
    expect(urlP).toBe(null)
    expect(likesDiv).toBe(null)
  })

  test('that the url and likes are shown after click', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    const urlP = component.container.querySelector('.url')
    const likesDiv = component.container.querySelector('.likes')
    expect(urlP).toHaveTextContent('http://realUrl.com')
    expect(likesDiv).toHaveTextContent('3')
  })

  test('that the like button event fires the corrcet number of times', () => {
    const showButton = component.container.querySelector('button')
    fireEvent.click(showButton)
    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  let component
  let authorInput
  let titleInput
  let urlInput
  let form
  const mockCreateBlog = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm createBlog={mockCreateBlog} />
    )
    authorInput = component.container.querySelector('#author')
    titleInput = component.container.querySelector('#title')
    urlInput = component.container.querySelector('#url')
    form = component.container.querySelector('form')
  })

  test('the form renders the proper inputs', () => {
    expect(authorInput).toBeDefined()
    expect(titleInput).toBeDefined()
    expect(urlInput).toBeDefined()
  })

  test('createBlog is fired with the correct info', () => {
    fireEvent.change(authorInput,{ target: { value: 'Author' } })
    fireEvent.change(titleInput,{ target: { value: 'Title' } })
    fireEvent.change(urlInput,{ target: { value: 'http://url' } })
    fireEvent.submit(form)
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('Author')
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('Title')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://url')
  })
})