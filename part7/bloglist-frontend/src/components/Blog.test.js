import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = { name: 'Etunimi Sukunimi', username: 'kayttaja' }
  let component
  const blog = {
    title: 'TestiBlogi',
    author: 'Haamukirjoittaja',
    url: 'http://404.com',
    likes: 0,
    user: user
  }
  const blogs = []

  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogs={blogs} setBlogs={() => console.log('Hello there')} user={user} />
    )
  })


  test('renders title in default view', () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )
  })

  test('renders auhtor in default view', () => {
    expect(component.container).toHaveTextContent(
      blog.author
    )
  })

  test('does not render likes or url in default view', () => {
    expect(component.container).not.toHaveTextContent(
      'display: none'
    )
  })

  test('clicking the blog element will show extended view containing url and likes', async () => {
    const div = component.container.querySelector('.clickableDiv')
    fireEvent.click(div)
    expect(component.container).not.toHaveTextContent(
      'display: none'
    )
  })
})