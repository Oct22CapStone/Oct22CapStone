import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./components/Navbar/PageWrapper";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import About from "./pages/About"; 
import Header from "./components/Navbar/Header";
import Footer from "./components/Navbar/Footer"; 
import Profile from "./pages/Profile";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import RegistryForm from "./components/RegistryForm";



const oktaAuth = new OktaAuth(oktaConfig);

const Routes = () => {
	const history = useHistory();
	const originalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
	};

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri}>
			<Nav />
			<Switch>

				<Route path="/" exact={true} component={Home} />
        		<Route path="/register" exact={true} component={RegistryForm} />
				<Route path="/about" exact={true} component={About} />
				<SecureRoute path="/profile" component={Profile} />
				<Route path="/login/callback" component={LoginCallback} />
				
			</Switch>
		</Security>
	);
};

export default Routes;