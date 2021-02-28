// action creators for user-management
import * as UserActions from '../constants/userActions';
import { v4 as uuidv4 } from 'uuid';
export const addUser = (user) => ({
    type: UserActions.REGISTER_USER,
    user: {...user, id: uuidv4()}
});