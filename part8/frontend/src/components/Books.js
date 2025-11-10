import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const Books = ({ show, ALL_BOOKS }) => {
  const [filter, setFilter] = useState('all genres')
  const [books, setBooks] = useState(undefined)
  const client = useApolloClient()

  useEffect(() => {
    const variables = filter === 'all genres' ? null : { genre: filter }
    client.query({ query: ALL_BOOKS, variables })
      .then(response => {
        setBooks(response.data.allBooks) 
      })
  }, [filter]);

  if (!show) {
    return null
  }

  if (books === undefined) {
    return <div>loading...</div>
  }

  const genrelist = ['refactoring', 'agile', 'patterns', 'desing', 'crime', 'classic', 'all genres']

  const handleClick = (event) => {
    event.persist()
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {genrelist.map(genre => <button key={genre} value={genre} onClick={handleClick}>{genre}</button>)}
      </div>

    </div>
  )
}

export default Books