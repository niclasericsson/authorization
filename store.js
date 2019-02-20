import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const middleware = applyMiddleware(thunkMiddleware)

export default function configureStore(preloadedState = {}) {
  return createStore(
    reducer,
    preloadedState,
    middleware
  )
}