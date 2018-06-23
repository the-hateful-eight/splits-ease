import { createStore, combineReducers, applyMiddleware } from 'redux'
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user'

const reducer = combineReducers({ user })

const store = createStore(
    reducer,
    applyMiddleware(loggingMiddleware, thunkMiddleware)
)

export default store