export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
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

export function addQuestion({author, id}) {
    return {
        type: ADD_QUESTION_TO_USER,
        author,
        id
    }
}