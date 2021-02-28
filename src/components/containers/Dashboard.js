import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import DashboardUI from '../ui-component/DashboardUI';
import DashboardContext from '../context/DashboardContext';
import {
	addTodo, updateTodo,
	completeTodo, deleteTodo, 
	bookmarkTodo, emptyTodos
} from '../../redux/actions/todoActions';
import {signout} from '../../redux/actions/authActions';
import { setFilter } from '../../redux/actions/filterActions';
import * as Filters from '../../redux/constants/filters';



// filters the todos based on passed list!
const getFilteredTodos = (authUserId, todosList, filter) => {
	return todosList.filter(todo => {
		if (todo.author !== authUserId)	return false;
		switch(filter){
			case Filters.ALL_TODOS: 		return true;
			case Filters.ACTIVE_TODOS: 		return !todo.deleted && !todo.completed;
			case Filters.COMPLETED_TODOS: 	return !todo.deleted && todo.completed;
			case Filters.INCOMPLETE_TODOS: 	return !todo.deleted && !todo.completed;
			case Filters.BOOKMARKED_TODOS: 	return !todo.deleted && todo.bookmarked;
			case Filters.DELETED_TODOS: 	return todo.deleted;
			default: 						return false;
		}
	}).sort((todo1, todo2) => new Date(todo2.createdAt) - new Date(todo1.createdAt));
};

const Dashboard = (props) => {
	// destructure the properties added by 
	// mapDispatchToProps
	const {
		requestAddTodo, requestUpdateTodo,
		requestCompleteTodo, requestBookmarkTodo, 
		requestDeleteTodo, requestEmptyTodos,
		requestUpdateFilter,
		requestSignOut,
	} = props;
	const {authUser} = props;

	// local state management for UI
	const [selectedOperation, setSelectedOperation] = useState(props.filter);
	const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 500);
	const [showTodoModal, setShowTodoModal] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const closeTodoModal = () => {
		setShowTodoModal(false);
		setSelectedTodo(null);
	};
	const todoOnClickHandler = (todo) => {
		setSelectedTodo(todo);
		setShowTodoModal(true);
	};
	const logout = () => requestSignOut();

	// maps the handler to redux-reducers
	const saveTodoHandler = (todo, title, summary) => {
		setShowTodoModal(false);
		if (todo)	requestUpdateTodo({...todo, title, summary});
		else		requestAddTodo({
			author: authUser.id,
			completed: false,
			bookmarked: false,
			deleted: false,
			title, summary,
			createdAt: new Date()
		});
	}
	const completeTodoHandler = (todoId) => requestCompleteTodo(todoId);
	const bookmarkTodoHandler = (todoId) => requestBookmarkTodo(todoId);
	const deleteTodoHandler = (todoId) => requestDeleteTodo(todoId);
	const emptyTrashHandler = () => requestEmptyTodos();
	const sidebarMenuChangeHandler = (selectedItem) => {
		setSelectedOperation(selectedItem);
		requestUpdateFilter(selectedItem);
	}


	if (authUser === null)	return <Redirect to="/signin" />;
	const username = (authUser.firstName + " " + authUser.lastName);
	const todos = getFilteredTodos(authUser.id, props.todos, selectedOperation);
	return (
		<DashboardContext.Provider value={{

			// context for SideBarUI
			drawerOpen, setDrawerOpen,
			selectedOperation, sidebarMenuChangeHandler,

			// context for ToolbarUI
			username, logout,

			// context for EditTodoUI
			showTodoModal, selectedTodo,
			saveTodoHandler, closeTodoModal,

			// context for TodoUI
			completeTodoHandler, bookmarkTodoHandler,
			deleteTodoHandler, todoOnClickHandler,

			// context for DashboardUI
			setShowTodoModal, showDeleteModal, setShowDeleteModal,

			// context for DeleteModalUI
			emptyTrashHandler,

			// for todosListUI
			todos,

		}}>
			<DashboardUI />
		</DashboardContext.Provider>
	);
};

const mapStateToProps = (state) => {
	return ({ 
		authUser: state.authUser,
		todos: state.todos,
		filter: state.filter
	});
}
const mapDispatchToProps = (dispatch) => {
	return ({
		requestAddTodo: (todo) => dispatch(addTodo(todo)),
		requestUpdateTodo: (todo) => dispatch(updateTodo(todo)),
		requestCompleteTodo: (todoId) => dispatch(completeTodo(todoId)),
		requestBookmarkTodo: (todoId) => dispatch(bookmarkTodo(todoId)),
		requestDeleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
		requestEmptyTodos: () => dispatch(emptyTodos()),
		requestUpdateFilter: (filter) => dispatch(setFilter(filter)),
		requestSignOut: () => dispatch(signout()),
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);