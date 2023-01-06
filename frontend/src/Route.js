import { Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import RegistryForm from "./components/RegistryForm";
import Orders from "./pages/Orders";



const oktaAuth = new OktaAuth(oktaConfig);

const Routes = () => {
	const history = useHistory();
	const originalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
	};

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri}>
			<Navbar />
			<Switch>
				<Route path="/" exact={true} component={Home} />
        		<Route path="/register" exact={true} component={RegistryForm} />
				<SecureRoute path="/orders" component={Orders} />
				<SecureRoute path="/profile" component={Profile} />
				<Route path="/login/callback" component={LoginCallback} />
			</Switch>
		</Security>
	);
};

export default Routes;