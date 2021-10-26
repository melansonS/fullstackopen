import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => a.votes < b.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({type: 'VOTE', id})
  }

  const getId = () => (100000 * Math.random()).toFixed(0)


  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch({type:'ADD_ANECDOTE', anecdote: {
      content: anecdoteContent,
      id: getId(),
      likes: 0
    }})
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App