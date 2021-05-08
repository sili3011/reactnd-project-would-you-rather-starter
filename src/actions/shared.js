import { showLoading, hideLoading } from 'react-redux-loading'
import { loginUser } from './loggedInUser'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(loginUser(null));
        getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        })
        return;
    }
}