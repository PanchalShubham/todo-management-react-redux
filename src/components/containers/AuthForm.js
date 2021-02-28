import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/userActions';
import { signin } from '../../redux/actions/authActions';
import {Redirect} from 'react-router-dom';
import AuthFormUI from '../ui-component/AuthFormUI';

const AuthForm = (props) => {

	const {
		isSignup,
		requestAddUser,
		requestSignin,
	} = props;

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(props.authUser !== null)

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	const validate = () => {
		if (isSignup) {
			if (firstName.trim() === "") {
				setErrorMessage("Please provide your firstName!");
				return false;
			}
			if (lastName.trim() === "") {
				setErrorMessage("Please provide your lastName!");
				return false;
			}
		}
		if (!validateEmail(email)) {
			setErrorMessage("Please provide a valid email address!");
			return false;
		}
		if (password.trim() === "") {
			setErrorMessage("Please provide a valid password!");
			return false;
		}
		return true;
	};
	const onSubmitHandler = (event) => {
		event.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");
		if (!validate()) return;
		let index = props.users.findIndex(user => user.email === email);
		if (isSignup) {
			if (index !== -1) {
				setErrorMessage(`That email has already been taken!`);
			} else {
				let user = {
					firstName, lastName,
					email, password
				};
				requestAddUser(user);
				setSuccessMessage(`You were successfully registered!`);

			}
		} else {
			if (index === -1) {
				setErrorMessage(`That email is not registered!`);
			} else if (props.users[index].password !== password){
				setErrorMessage(`The password you just provided didn't work!`);
			} else {
				requestSignin(props.users[index]);
				setRedirect(true);
			}
		}
	}

	if (redirect)	return <Redirect to="/dashboard" />
	return (
		<AuthFormUI
			{...props}
			stateProperties={{
				successMessage, setSuccessMessage,
				errorMessage, setErrorMessage,
				firstName, setFirstName,
				lastName, setLastName,
				email, setEmail,
				password, setPassword,
				onSubmitHandler
			}}
		/>
	);
};

const mapStateToProps = (state) => ({
	users: state.users,
	authUser: state.authUser
});
const mapDispatchToProps = (dispatch) => ({
	requestAddUser: (user) => dispatch(addUser(user)),
	requestSignin: (user) => dispatch(signin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);