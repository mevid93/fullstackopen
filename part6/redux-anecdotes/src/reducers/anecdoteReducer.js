import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id) => {
  return async dispatch => {
    let anecdote = await anecdoteService.getById(id)
    anecdote.votes = anecdote.votes + 1
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const target = state.find(n => n.id === id)
      const votedAnecdote = {
        ...target,
        votes: target.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export default reducer