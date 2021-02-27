import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthForm from './components/containers/AuthForm';
import Dashboard from "./components/containers/Dashboard";
function App() {
  return (
  	<div className="App">
		<Router>
			<Switch>
				<Route exact path="/signin" render={() => <AuthForm isSignup={false} />} />
				<Route exact path="/signup" render={() => <AuthForm isSignup={true} />} />
				<Route exact path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
	</div>);
}
export default App;
