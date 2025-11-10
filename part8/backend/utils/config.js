require('dotenv').config()

let SECRET_KEY = process.env.SECRET_KEY
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  SECRET_KEY
}