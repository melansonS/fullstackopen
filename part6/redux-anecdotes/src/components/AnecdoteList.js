import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import Notification from './Notification'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a,b) => a.votes < b.votes))
  const anecdotesById = useSelector(state => state.anecdotes.reduce((acc, anecdote) => ({...acc, [anecdote.id]:anecdote.content}), {}))
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  
  const vote = async (id, anecdote) => {
    dispatch(voteForAnecdote(id, anecdote))
    dispatch(setNotification(`you voted '${anecdotesById[id]}'`, 5))
  }
  return <>
  {notification && <Notification />}
  <Filter />
  {anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
      </div>
    </div>
  )}
  </>
}

export default AnecdoteList