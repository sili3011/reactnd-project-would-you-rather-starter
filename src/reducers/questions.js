/* eslint-disable no-case-declarations */
import { RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return { ...state, ...action.questions}
        case ADD_ANSWER:

            const opOne = state[action.id].optionOne;
            const opTwo = state[action.id].optionTwo;

            if(action.annswer === 1) {
                opOne.votes = state[action.id].optionOne.votes.concat([action.user]);
            } else {
                opTwo.votes = state[action.id].optionTwo.votes.concat([action.user]);
            }

            return { ...state, [action.id]: {
                ...state[action.id],
                optionOne: action.answer === 1 ? opOne : state[action.id].optionOne,
                optionTwo: action.answer === 2 ? opTwo : state[action.id].optionTwo
            }};
        default: return state
    }
}
