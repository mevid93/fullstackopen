import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const blog = {
    title: 'TestiBlogi',
    author: 'Haamukirjoittaja',
    url: 'http://404.com',
    likes: 0
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
    )
  })


  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )
  })

  test('renders auhtor', () => {
    expect(component.container).toHaveTextContent(
      blog.author
    )
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent(
      `blog has ${blog.likes} likes`
    )
  })

  test('clicking the button twice class event handler twice', async () => {
    const mockHandler = jest.fn()

    const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})