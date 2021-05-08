import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import loggedInUser from './loggedInUser'
import questions from './questions'
import users from './users'

export default combineReducers({loggedInUser, questions, users, loadingBar: loadingBarReducer})