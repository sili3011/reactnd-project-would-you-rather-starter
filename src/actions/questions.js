import { saveQuestion } from "../utils/api"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addAnswer({id, answer, user}) {
    return {
        type: ADD_ANSWER,
        id,
        answer,
        user
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        return saveQuestion(question).catch((e) => {
            console.warn('Error in saveQuestion: ', e);
            alert('There was an error saving the question!');
        })
        .then((q) => 
            dispatch(addQuestion(q))
        )
    }
}