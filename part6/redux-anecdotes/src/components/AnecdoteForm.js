import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  let notificationTimeout

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(notificationTimeout) {
      window.clearTimeout(notificationTimeout)
    }
    const anecdoteContent = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(addAnecdote(anecdoteContent))

    dispatch(setNotification(`you have added '${anecdoteContent}'`))
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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