const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Kirjuri',
    url: 'http://blogs.com/Kirjuri/HTML',
    likes: 0,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'maattii',
      name: 'Matti Meikäläinen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8cp',
    title: 'CSS is horror',
    author: 'Nakuttaja',
    url: 'http://blogs.com/Nakuttaja/CSS',
    likes: 2,
    user: {
      id: '5a437a9e514ab7f168ddf139',
      username: 'laama',
      name: 'Maija Maijalainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8ch',
    title: 'Python',
    author: 'Guru',
    url: 'http://blogs.com/Guru/PY',
    likes: 666,
    user: {
      id: '5a437a9e514ab7f168ddf140',
      username: 'dosdos',
      name: 'Seppo Sepposmaa'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}


const setToken = (newToken) => {
  console.log('Useless mock function', newToken)
}

export default { getAll, setToken }