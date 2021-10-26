import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => a.votes < b.votes))
  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(voteForAnecdote(id))
  }
  return <>
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
  </>
}

export default AnecdoteList