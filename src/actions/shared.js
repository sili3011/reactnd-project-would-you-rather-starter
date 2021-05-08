import { showLoading, hideLoading } from 'react-redux-loading'
import { loginUser } from './loggedInUser'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        // return getInitialData().then(({ users, tweets }) => {
        //     dispatch(receiveUsers(users));
        //     dispatch(receiveTweets(tweets));
        //     dispatch(setAuthedUser(AUTHED_ID));
        //     dispatch(hideLoading())
        // })
        dispatch(loginUser(null));
        dispatch(hideLoading());
    }
}