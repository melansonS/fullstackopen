import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.anecdote.id ? action.anecdote : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }

}

export const voteForAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id, anecdote)
    dispatch({
      type:"VOTE",
      anecdote: updatedAnecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: "ADD_ANECDOTE", 
      data: newNote
    })
  }
} 

export const initializeAnecotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export default anecdoteReducer