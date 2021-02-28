import * as TodoActions from '../constants/todoActions';
// import todos from '../dummy_data/todos';

// initially we start with an empty list of todos
const initialState = [];

// now our state will be list of todos
const todosReducer = (state = initialState, action) => {
    switch (action.type) {

        case TodoActions.ADD_TODO:
            return [
                ...state,
                { ...action.todo }
            ];

        case TodoActions.UPDATE_TODO:
            return state.map(todo => (
                (todo.id === action.todo.id)
                    ? { ...action.todo, createdAt: new Date()}
                    : todo
            ));

        case TodoActions.TOGGLE_BOOKMARK_TODO:
            return state.map(todo => (
                (todo.id === action.todoId)
                    ? { ...todo, bookmarked: !todo.bookmarked }
                    : todo
            ));

        case TodoActions.TOGGLE_COMPLETE_TODO:
            return state.map(todo => (
                (todo.id === action.todoId)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            ));

        case TodoActions.TOGGLE_DELETE_TODO:
            return state.map(todo => (
                (todo.id === action.todoId)
                    ? { ...todo, deleted: !todo.deleted }
                    : todo
            ));

        case TodoActions.EMPTY_TODOS:
            return state.filter(todo => !todo.deleted);

        default:
            return state;
    }
};

export default todosReducer;
