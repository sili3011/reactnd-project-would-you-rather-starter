import { LOGIN_USER, LOGOUT_USER } from '../actions/loggedInUser'

export default function loggedInUser(state = null, action) {
    switch(action.type) {
        case LOGIN_USER:
            return action.loggedInUser;
        case LOGOUT_USER:
            return action.loggedInUser;
        default: return state;
    }
}