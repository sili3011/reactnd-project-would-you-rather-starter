export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION_TO_QUESTIONS = 'ADD_QUESTION_TO_QUESTIONS'

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
        type: ADD_QUESTION_TO_QUESTIONS,
        question
    }
}