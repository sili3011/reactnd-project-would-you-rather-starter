import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        })
        return;
    }
}