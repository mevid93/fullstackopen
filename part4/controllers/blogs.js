const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findById(request.user)
  blog.user = request.user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user) {
    return response.status(401).json({ error: 'unauthorized' })
  }
  const user = await User.findById(request.user)
  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user) {
    return response.status(401).json({ error: 'unauthorized' })
  }
  blog.title = request.body.title,
  blog.author = request.body.author
  blog.url = request.body.url
  blog.likes = request.body.likes
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)

})

module.exports = blogsRouter