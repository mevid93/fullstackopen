const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('users api', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('user identifier is named as id', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].id).toBeDefined()
  })

  test('new user can be added', async () => {
    const newUser = {
      username: "newnew",
      name: "Bruce Wayne",
      password: "TheyCallMeBatman"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)
  })

  test('username must be unique', async () => {
    const users = await helper.usersInDb()
    const user = users[0]
    const newUser = {
      username: user.username,
      name: "name nameless",
      password: "secret"
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('username must be at least 3 characters', async () => {
    const newUser = {
      username: "no",
      name: "name nameless",
      password: "secret"
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('password must be at least 3 characters', async () => {
    const newUser = {
      username: "yes",
      name: "name nameless",
      password: "no"
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})