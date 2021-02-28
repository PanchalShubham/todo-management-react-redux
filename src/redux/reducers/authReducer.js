// maintains the authUser
import * as AuthActions from '../constants/authActions';
const initialState = null;
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.SIGNIN:
            return action.user;
        case AuthActions.SIGNOUT:
            return null;
        default:
            return state;
    }
};
export default authReducer;