import axios from 'axios'
import config from '../config'
const baseUrl = config.BACKEND_URL + '/api/users'

let TOKEN = null

const setToken = (newToken) => {
  TOKEN = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: TOKEN }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { getAll, setToken }