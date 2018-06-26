import { createStore, combineReducers, applyMiddleware } from 'redux'
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user'
import items from './items'

const reducer = combineReducers({ user, items })

const store = createStore(
    reducer,
    applyMiddleware(loggingMiddleware, thunkMiddleware)
)

export default store