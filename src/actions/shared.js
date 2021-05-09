import { receiveUsers, addAnswer as addAnswerToUser } from './users'
import { receiveQuestions, addAnswer as addAnswerToQuestion } from './questions'
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

export function addAnswer({id, answer, user}) {
    return (dispatch) => {
        dispatch(addAnswerToQuestion({id, answer, user}));
        dispatch(addAnswerToUser({id, answer, user}));
        return;
    }
}