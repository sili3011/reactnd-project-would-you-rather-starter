import { RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION_TO_USER } from '../actions/users'

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return { ...state, ...action.users};
        case ADD_ANSWER:
            return { 
                ...state,
                [action.user]: {
                    ...state[action.user],
                    answers: {
                        ...state[action.user].answers,
                       [action.id]: action.answer
                    }
                }
            };
        case ADD_QUESTION_TO_USER:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: [...state[action.author].questions].concat(action.id)
                }
            };
        default: return state
    }
}