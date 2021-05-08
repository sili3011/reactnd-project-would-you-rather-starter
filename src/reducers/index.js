import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import loggedInUser from './loggedInUser'

export default combineReducers({loggedInUser, loadingBar: loadingBarReducer})