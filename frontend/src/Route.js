import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./components/Navbar/PageWrapper";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import RegistryForm from "./components/RegistryForm";
import ViewSingleProduct from "./pages/ViewSingleProduct";
import ViewUser from "./pages/ViewUser";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import ViewProducts from "./pages/ViewProducts";
import EditProducts from "./pages/EditProducts";
import AddAddress from "./pages/AddAddress";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";

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
				<SecureRoute path="/users" component={ViewUser} />
				<SecureRoute path="/adduser" component={CreateUser} />
				<SecureRoute path="/edituser" component={EditUser} />
				<Route path="/login/callback" component={LoginCallback} />	
				<Route path="/viewsingleproduct/:id" exact={true} component={ViewSingleProduct}/>
				<SecureRoute path="/viewproducts" component={ViewProducts}/>
				<SecureRoute path="/addproduct" component={AddProduct}/>	
				<SecureRoute path="/editproducts/:id" exact={true} component={EditProducts}/>
				<SecureRoute path="/orders" exact={true} component={Orders}/>

				<SecureRoute path="/cart" exact={true}  component={Cart}/>
        <Route path="/addaddress" exact={true} component={AddAddress} />


			</Switch>
		</Security>
	);
};

export default Routes;
