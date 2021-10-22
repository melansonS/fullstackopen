import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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