import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(addAnecdote(anecdoteContent))
  }
  return (
  <div>
    <h2>Create new</h2>
    <form onSubmit={handleSubmit}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
  </div>
  )
}

export default AnecdoteForm