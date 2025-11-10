const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('blogs api', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blog identifier is named as id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].id).toBeDefined()
  })

  test('new blog can be added', async () => {
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test('after adding new blog, the corresponding title can be found', async () => {
    const response = await api.get('/api/blogs')
    let titles = response.body.map(r => r.title)
    expect(titles).not.toContain('Blogging blogs')
    
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 0,
    }
    await api.post('/api/blogs').send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Blogging blogs')
  })

  test('blog likes will be set to 0, if undefined', async () => {
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/"
    }
    await api.post('/api/blogs').send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(blog.likes).toBe(0)
  })

  test('blog likes will remain unchainged, if not undefined', async () => {
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 100
    }
    await api.post('/api/blogs').send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(blog.likes).toBe(100)
  })

  test('new blog needs to have title to be considered as valid', async () => {
    const newBlog = {
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('new blog needs to have url to be considered as valid', async () => {
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      likes: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('existing blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
  })

  test('blog can be edited with valid title and url', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    const initialLikes = blog.likes
    blog.likes = initialLikes + 10
    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
    expect(response.body.likes).toBe(initialLikes + 10)
  })

})

afterAll(() => {
  mongoose.connection.close()
})