import { receiveUsers, addAnswer as addAnswerToUser, addQuestion as addQuestionToUser } from './users'
import { receiveQuestions, addAnswer as addAnswerToQuestion, addQuestion as addQuestionToQuestions } from './questions'
import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'

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

export function addQuestion({optionOneText, optionTwoText, author}) {
    return (dispatch) => {
        return saveQuestion({optionOneText, optionTwoText, author}).catch((e) => {
            console.warn('Error in saveQuestion: ', e);
            alert('There was an error saving the question!');
        }).then((q) => {
            dispatch(addQuestionToQuestions(q));
            dispatch(addQuestionToUser({author: author, id: q.id}));
        });
    }
}