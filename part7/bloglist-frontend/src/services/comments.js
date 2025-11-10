import axios from 'axios'
import config from '../config'
const baseUrl = config.BACKEND_URL + '/api/blogs'

let TOKEN = null

const setToken = (newToken) => {
  TOKEN = `bearer ${newToken}`
}

const create = (commentObject, blogid) => {
  const config = {
    headers: { Authorization: TOKEN }
  }
  const request = axios.post(`${baseUrl}/${blogid}/comments`, commentObject, config)
  return request.then(response => response.data)
}

export default { create, setToken }