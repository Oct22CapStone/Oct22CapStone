import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOktaAuth } from "@okta/okta-react";

const Nav = () => {
	const { oktaAuth, authState } = useOktaAuth();

	const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: "/" });

	const loggingOut = async () => {
		oktaAuth.tokenManager.clear();
	  };

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
            <a href="/"><img src="https://i.ibb.co/cg1NqMM/logo3.jpg" class = "float-left" alt="logo3" border="0" width = "400" height = "100" align ="left"></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/about">About</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">All Products</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form>
                    
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/viewproducts">Manage Products</Link></li>
                                <li><Link className="dropdown-item" to="/orders">Manage Orders</Link></li>
                                {/* <li><Link className="dropdown-item" to="/user">Manage Orders</Link></li> */}
                            </ul>
                        </li>
					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/profile">Profile</a></li>
					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/register">Register</a></li>
					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Login</a></li>
					</ul>
                </div>
            </div>
        </nav>
	);
};



export default Nav;