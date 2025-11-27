const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let token = undefined

beforeEach(async () => {
  // Fill db with users data
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  // Fill db with blogs data
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // Sign in with first user to get a valid token
  const user = helper.initialUsers[0]
  const response = await api
    .post('/api/login')
    .send({ username: user.username, password: user.password })
  token = response.body.token
})

after(async () => {
  await mongoose.connection.close()
})

describe('blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const blogTitles = response.body.map(b => b.title)
    assert.strictEqual(blogTitles.includes('First class tests'), true)
  })

  test('blog identifier is named as id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0]._id, undefined)
    assert.notStrictEqual(response.body[0].id, undefined)
  })

  test('new blog can be added', async () => {
    // Post new blog
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('new blog cannot be added without token', async () => {
    // Post new blog
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('after adding new blog, the corresponding title can be found', async () => {
    const response = await api.get('/api/blogs')
    let titles = response.body.map(r => r.title)
    assert.strictEqual(titles.includes('Blogging blogs'), false)

    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 0,
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    titles = blogsAtEnd.map(r => r.title)
    assert.strictEqual(titles.includes('Blogging blogs'), true)
  })

  test('blog likes will be set to 0, if undefined', async () => {
    const newBlog = {
      title: "Blogging blogs",
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/"
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    assert.strictEqual(blog.likes, 0)
  })

  test('new blog needs to have title to be considered as valid', async () => {
    const newBlog = {
      author: "Blog TheBlogger",
      url: "https://awesomeblogs.com/",
      likes: 100
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('existing blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    // Verify that blog was removed
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    // Verify that blog reference was removed from user
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd[0].blogs.length, 0)
  })

  test('blog can updated', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    const initialLikes = blog.likes
    blog.likes = initialLikes + 10
    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200)
    assert.strictEqual(response.body.likes, initialLikes + 10)
  })
})