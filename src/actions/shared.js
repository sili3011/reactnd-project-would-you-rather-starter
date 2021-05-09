import { receiveUsers, addAnswer as addAnswerToUser } from './users'
import { receiveQuestions, addAnswer as addAnswerToQuestion } from './questions'
import { getInitialData, saveQuestionAnswer } from '../utils/api'

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
        return saveQuestionAnswer({user, id, answer}).catch((e) => {
            console.warn('Error in saveQuestionAnswer: ', e);
            alert('There was an error answering the question!')
        }).then(() => {
            dispatch(addAnswerToQuestion({id, answer, user}));
            dispatch(addAnswerToUser({id, answer, user}));
        });
    }
}