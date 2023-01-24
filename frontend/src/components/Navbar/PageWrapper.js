import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOktaAuth } from "@okta/okta-react";
import UserService from '../../services/UserService';
import useAuthUser from '../../hook/getUser';
import UserRoleService from '../../services/UserRoleService';
global.change = false;

const Nav = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: "/" });
    const [cartItems, setCartItems] = useState(null);
    const [items, setItems] = useState([]);
    const userInfo = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    function refreshPage() {
        window.location.reload(true);
    }
    function Admin() {
        if (isAdmin && authState.isAuthenticated) {
            return (
                <li className="nav-item dropdown">                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">                        <li><Link className="dropdown-item" to="/viewproducts">Manage Products</Link></li>                        <li><Link className="dropdown-item" to="/orders">Manage Orders</Link></li>                        <li><Link className="dropdown-item" to="/viewuser">Manage Users</Link></li>                    </ul>                </li>            )
        }
    }
    window.updateCartTotal = function () {
        if (JSON.parse(localStorage.getItem('cart')) != null) {
            setItems((JSON.parse(localStorage.getItem('cart'))).length);
        }
    }
    const loggingOut = async () => {
        // oktaAuth.signOut();    
        oktaAuth.tokenManager.clear(oktaAuth.getIdToken());
        oktaAuth.closeSession();
        refreshPage();
    };
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('cart')) != null) {
            const cart = JSON.parse(localStorage.getItem("cart")).length;
            setCartItems(cart);
        }
    }, [cartItems]);
    useEffect(() => {
        const fetchData = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles == 1) {
                setIsAdmin(true);
                //refreshPage();
            } else {
                setIsAdmin(false);
            }
        }
        fetchData();
        if (JSON.parse(localStorage.getItem('cart')) != null) {
            setItems((JSON.parse(localStorage.getItem('cart'))).length);
        }
    }, [global.change]);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-collapse white-space-nowrap">            <div className="container-fluid px-4 px-lg-5">                <a href="/"><img src="https://i.ibb.co/cg1NqMM/logo3.jpg" className="float-left" alt="logo3" border="0" width="400" height="100" align="left"></img></a>                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>                <div className="collapse navbar-collapse" id="navbarSupportedContent">                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/about">About</a></li>                        <li className="nav-item dropdown">                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">                                <li><a className="dropdown-item" href="/">All Products</a></li>                                <li><hr className="dropdown-divider" /></li>                                <li><Link className="dropdown-item" to="/popularitems">Highlighted Items</Link></li>                                <li><Link className="dropdown-item" to="/latestproducts">New Arrivals</Link></li>                            </ul>                        </li>                    </ul>                    <form className="d-flex">                        <Link to="/cart" className="btn btn-outline-dark" type="submit">                            <i className="bi-cart-fill me-1"></i>                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{items}</span>                        </Link>                    </form>                    <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0 ms-lg-4 nav-fill">                        <Admin />                        {
                            authState?.isAuthenticated ? (
                                <div className="ms-auto mb-lg-0">                                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/register">Create New Account</a></li>                                </div>                            ) : (
                                <div className="ms-auto mb-lg-0">                                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/register">Register</a></li>                                </div>                            )
                        }
                        {
                            authState?.isAuthenticated ? (
                                <div className="ms-auto mb-lg-0">                                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/profile">Welcome {userInfo?.given_name}!</a></li>                                </div>                            ) : (
                                <div className="ms-auto mb-lg-0">                                </div>                            )
                        }
                        {
                            authState?.isAuthenticated ? (
                                <div className="ms-auto mb-lg-0">                                    <li className="nav-item"><img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="Admin" class="rounded-circle" width="40"></img></li>                                </div>                            ) : (
                                <div className="ms-auto mb-4 mb-lg-0 mb-4">                                </div>                            )
                        }
                        {
                            authState?.isAuthenticated ? (
                                <div className="ms-auto mb-lg-0">                                    <button className="btn btn-link active" onClick={loggingOut}>Logout</button>                                </div>                            ) : (
                                <div className="ms-auto mb-lg-0">                                    <Link className="btn-link btn active" to="/login">Login</Link>                                </div>                            )
                        }
                        {/*<li className="nav-item"><a className="nav-link active" aria-current="page" onClick={loggingIn}>Login</a></li>*/}
                    </ul>                </div>            </div>        </nav>    );
};
export default Nav;