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
import EditUser from "./pages/EditUser";
import ViewProducts from "./pages/ViewProducts";
import EditProducts from "./pages/EditProducts";
import AddAddress from "./pages/AddAddress";
import Orders from "./pages/Orders";
import EditOrders from "./pages/EditOrders";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import EditAddress from "./pages/EditAddress";
import UserOrders from "./pages/UserOrders";
import OrderDetails from "./pages/OrderDetails";

import PopularItems from "./pages/PopularItems";

import Login from "./pages/Login";


const oktaAuth = new OktaAuth(oktaConfig);

const Routes = () => {
	const history = useHistory();
	const originalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
	};
	const onAuthRequired = function() {
		history.push('/login')
	  }

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri} onAuthRequired={onAuthRequired}>
			<Nav />
			<Switch>
				<Route path="/" exact={true} component={Home} />
        		<Route path="/register" exact={true} component={RegistryForm} />



				<Route path="/popularitems" exact={true} component={PopularItems} />

				<Route path='/login' exact={true} component={Login}/>

				<Route path="/about" exact={true} component={About} />
				<SecureRoute path="/profile" component={Profile} />
				<SecureRoute path="/viewuser" component={ViewUser} />
				<SecureRoute path="/edituser/:id" component={EditUser} />
				<Route path="/login/callback" component={LoginCallback} />	
				<Route path="/viewsingleproduct/:id" exact={true} component={ViewSingleProduct}/>
				<SecureRoute path="/viewproducts" component={ViewProducts}/>
				<SecureRoute path="/addproduct" component={AddProduct}/>	
				<SecureRoute path="/editproducts/:id" exact={true} component={EditProducts}/>
				<SecureRoute path="/editaddress/:id" exact={true} component={EditAddress}/>
				<SecureRoute path="/orders" exact={true} component={Orders}/>
				<SecureRoute path="/userorders" exact={true} component={UserOrders}/>
				<SecureRoute path="/orderdetails/:id" exact={true} component={OrderDetails}/>
				<SecureRoute path="/cart" exact={true}  component={Cart}/>
        		<Route path="/addaddress" exact={true} component={AddAddress} />
				<SecureRoute path="/editorders/:id" exact={true} component={EditOrders}/>
			</Switch>
		</Security>
	);
};

export default Routes;
