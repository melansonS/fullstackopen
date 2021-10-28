import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store