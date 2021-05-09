/* eslint-disable no-case-declarations */
import { ADD_QUESTION, RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_ANSWER } from '../actions/questions'
import { OPTION_ONE, OPTION_TWO } from '../utils/ENUMS'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return { ...state, ...action.questions}
        case ADD_ANSWER:

            const opOne = state[action.id].optionOne;
            const opTwo = state[action.id].optionTwo;

            if(action.annswer === OPTION_ONE) {
                opOne.votes = state[action.id].optionOne.votes.concat([action.user]);
            } else {
                opTwo.votes = state[action.id].optionTwo.votes.concat([action.user]);
            }

            return { ...state, [action.id]: {
                ...state[action.id],
                optionOne: action.answer === OPTION_ONE ? opOne : state[action.id].optionOne,
                optionTwo: action.answer === OPTION_TWO ? opTwo : state[action.id].optionTwo
            }};
        case ADD_QUESTION:
            return { ...state, [action.question.id]: action.question}
        default: return state
    }
}
