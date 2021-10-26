import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    e.target.anecdote.value = ""
    props.addAnecdote(anecdoteContent)
    props.setNotification(`you have added '${anecdoteContent}'`, 5)
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm