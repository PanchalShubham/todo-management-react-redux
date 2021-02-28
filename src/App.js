import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';
import AuthForm from './components/containers/AuthForm';
import Dashboard from "./components/containers/Dashboard";
import HomepageUI from './components/ui-component/HomepageUI';

const store = createStore(rootReducer);
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            store.getState().authUser ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Router basename="/todo-management-react-redux">
					<Switch>
						<Route exact path="/" render={() => <HomepageUI />} />
						<Route exact path="/signin" render={() => <AuthForm isSignup={false} />} />
						<Route exact path="/signup" render={() => <AuthForm isSignup={true} />} />
						<PrivateRoute exact path="/dashboard" component={Dashboard}/>
						<Redirect from="/" to="/" />
					</Switch>
				</Router>
			</div>
		</Provider>
	);

}
export default App;
