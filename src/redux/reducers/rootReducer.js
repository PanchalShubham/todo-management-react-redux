import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import todosReducer from './todosReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
    authUser: authReducer,
    users: userReducer,
    todos: todosReducer,
    filter: filterReducer
});
export default rootReducer;