
const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }

}

export const voteForAnecdote = (id) => {
  return {type:"VOTE", id}
}

export const addAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE", 
    anecdote: {
      content,
      id: getId(),
      votes: 0
  }}
} 

export const initializeAnecotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data
  }
}

export default anecdoteReducer