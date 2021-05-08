export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(loggedInUser) {
    return {
        type: LOGIN_USER,
        loggedInUser,
    }
}

export function logoutUser(loggedInUser = null) {
    return {
        type: LOGOUT_USER,
        loggedInUser,
    }
}