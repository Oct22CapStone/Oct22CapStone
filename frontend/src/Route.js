import { Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import RegistryForm from "./components/RegistryForm";

// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

// const connection = mysql.createPool({
// 	host		: 'localhost',
// 	user		: 'root',
// 	password	: 'MySQLComServer',
// 	database	: 'oct22capstone'
// })

// const app = express();
// app.get('/users', function(req,res){
// 	connection.getConnection(function(err,connection){
// 		connection.query('SELECT * FROM users', function (error, results, fields){
// 			if (error) throw error;
// 			res.send(results)
// 		});
// 	});
// });
// app.listen(3000, () => {
// 	console.log('Go to http://localhost:3000/users so yu can see the data.');
// });


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
				<SecureRoute path="/profile" component={Profile} />
				<SecureRoute path="/user" component={User} />
				<Route path="/login/callback" component={LoginCallback} />
			</Switch>
		</Security>
	);
};

export default Routes;