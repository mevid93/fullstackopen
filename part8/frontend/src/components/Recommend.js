import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USER = gql`
{
  me {
    username
    favoriteGenre
    id
  }
}
`

const Recommend = ({ show, resultBooks }) => {
  const [user, setUser] = useState(undefined)
  const client = useApolloClient()

  useEffect(() => {
    client.query({ query: USER }).then(response => { setUser(response.data.me) })
  }, [])

  if (!show) {
    return null
  }

  if (resultBooks.data === undefined || resultBooks.data === undefined || user === undefined) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks

  const filteredBooks = () => {
    const filteredBooks = books.filter(b => {
      for (let i = 0; i < b.genres.length; i++) {
        const genre = b.genres[i]
        if (genre === user.favoriteGenre) {
          return true
        }
      }
      return false
    })
    return filteredBooks
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{user.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Recommend