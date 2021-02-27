import React, { useState } from 'react';
import * as TodoOperation from './TodoOperation';
import DashboardUI from '../ui-component/DashboardUI';
import DashboardContext from '../context/DashboardContext';
import AllTodos from './todos';

export default function Dashboard(props) {
	const [selectedOperation, setSelectedOperation] = useState(TodoOperation.ALL_TODOS);
	const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 500);
	const [showTodoModal, setShowTodoModal] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);

	const [allTodos, setAllTodos] = useState(AllTodos);
	const [todos, setTodos] = useState(AllTodos);

	const closeTodoModal = () => {
		setShowTodoModal(false);
		setSelectedTodo(null);
	}
	const saveTodoHandler = (todId, title, summary) => {
		setShowTodoModal(false);
	}

	const todoOnClickHandler = (todo) => {
		setSelectedTodo(todo);
		setShowTodoModal(true);
	};

	const editTodoHandler = (todoId) => { }
	const completeTodoHandler = (todoId, completed) => { }
	const bookmarkTodoHandler = (todoId, bookmarked) => { }
	const deleteTodoHandler = (todoId) => { }
	const restoreTodoHandler = (todoId) => { }
	const emptyTrashHandler = () => { }
	const sidebarMenuChangeHandler = (selectedItem) => {
		setSelectedOperation(selectedItem);
		switch (selectedItem) {
			case TodoOperation.COMPLETED_TODOS:
				setTodos(allTodos.filter(todo => todo.completed));
				break;
			case TodoOperation.INCOMPLETE_TODOS:
				setTodos(allTodos.filter(todo => !todo.completed));
				break;
			case TodoOperation.BOOKMARKED_TODOS:
				setTodos(allTodos.filter(todo => todo.bookmarked));
				break;
			case TodoOperation.DELETED_TODOS:
				setTodos(allTodos.filter(todo => todo.deleted));
				break;
			default:
				setTodos(allTodos);
				break;
		}
	}

	return (
		<DashboardContext.Provider value={{

			// context for SideBarUI
			drawerOpen, setDrawerOpen,
			selectedOperation, sidebarMenuChangeHandler,
			allTodos,

			// context for EditTodoUI
			showTodoModal, selectedTodo,
			saveTodoHandler, closeTodoModal,

			// context for TodoUI
			editTodoHandler, completeTodoHandler, bookmarkTodoHandler,
			deleteTodoHandler, restoreTodoHandler, todoOnClickHandler,

			// context for DashboardUI
			setShowTodoModal,


			emptyTrashHandler,

			// for todosListUI
			todos,

		}}>
			<DashboardUI />
		</DashboardContext.Provider>
	);
};