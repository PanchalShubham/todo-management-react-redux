// action creaters for todo-management
import * as TodosActions from '../constants/todoActions';
import { v4 as uuidv4 } from 'uuid';

export const addTodo = (todo) => ({
    type: TodosActions.ADD_TODO,
    todo: {...todo, id: uuidv4()}
});

export const updateTodo = (todo) => ({
    type: TodosActions.UPDATE_TODO,
    todo
});

export const bookmarkTodo = (todoId) => ({
    type: TodosActions.TOGGLE_BOOKMARK_TODO,
    todoId
});

export const deleteTodo = (todoId) => ({
    type: TodosActions.TOGGLE_DELETE_TODO,
    todoId
});

export const completeTodo = (todoId) => ({
    type: TodosActions.TOGGLE_COMPLETE_TODO,
    todoId
});

export const emptyTodos = () => ({
    type: TodosActions.EMPTY_TODOS
});