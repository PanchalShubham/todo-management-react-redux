import React, { useState } from 'react';
import AuthFormUI from '../ui-component/AuthFormUI';
export default function AuthForm(props){
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isSignup } = props;

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
			if (lastName.trim() === ""){
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
		if (!validate())	return;
		setSuccessMessage("OK to proceed!");
		// make API request here
	}
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