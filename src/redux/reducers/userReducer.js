// maintains the list of users
import * as UserActions from '../constants/userActions';
import { v4 as uuidv4 } from 'uuid';

const userReducer = (state = [], action) => {
    switch (action.type) {
        case UserActions.REGISTER_USER:
            return [
                ...state,
                { ...action.user, id: uuidv4() }
            ];
        default:
            return state;
    }
};
export default userReducer;