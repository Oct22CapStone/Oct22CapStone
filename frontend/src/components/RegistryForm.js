import React, { useState } from 'react';

import axios from 'axios';

import Footer from '../components/Navbar/Footer';

import Header from '../components/Navbar/Header';

import {

  MDBContainer,

  MDBIcon

}

  from 'mdb-react-ui-kit';

import UserRoleService from '../services/UserRoleService';

import UserService from '../services/UserService';



const validEmailRegex = RegExp(

  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

);



const validateForm = (errors) => {

  let valid = true;

  Object.values(errors).forEach(val => val.length > 0 && (valid = false));

  console.log("message");

  return valid;

};



export default class RegistryForm extends React.Component {

  constructor(props) {

    super(props);

    this.state = {



      firstName: null,

      lastName: null,

      email: null,

      phone: null,

      message: null,

      eMessage: null,

      isError: false,

      formValid: false,

      errors: {

        firstName: '',

        lastName: '',

        email: '',

        phone: ''

      }

    };

  };




  handleChange = (event) => {

    const { name, value } = event.target;

    let errors = this.state.errors;

   

    switch (name) {

      case 'firstName':

        errors.firstName =

          value.length < 2

            ? 'First Name must be at least 2 characters long!'

            : '';

        break;

      case 'lastName':

        errors.lastName =

          value.length < 2

            ? 'Last Name must be at least 2 characters long!'

            : '';

        break;

      case 'email':

        errors.email =

          validEmailRegex.test(value)

            ? ''

            : 'Email is not valid!';

        break;

      case 'phone':

        errors.phone =

          value.length < 10

            ? 'Phone number must be at least 10 digits long!'

            : '';

        break;

      default:

        break;

    }

        this.setState({ errors, [name]: value });




    }




  handleRegister = async (event) => {

    event.preventDefault();    

    let user = null;

    if(validateForm(this.state.errors)) {

      this.setState({formValid: true});

    }

    if (this.state.formValid) {

      try{

        const newUser = await UserService.getUserByEmail(this.state.email);

        user = newUser.data;

      }catch(error){

        console.log(error);

      }

     

      if (user != "" && this.setState.email != null) {

        this.setState({ eMessage: "Email already exists" })

        this.setState({ isError: true });

      } else {

        console.log("here");

        const val = {

          firstName: this.state.firstName,

          lastName: this.state.lastName,

          email: this.state.email,

          phone: this.state.phone

        };



        await UserService.createUser(val);

        const newUser = await UserService.getUserByEmail(val.email);

        const role = { roleId: 2 };

        const userRole = { role: role, user: newUser.data };

        await UserRoleService.createUserRole(userRole);

        this.setState({ message: "Thanks for registering! You will get an email shortly to set up your password." })

        this.setState({ isError: false });

        this.setState({formValid: false});

      }



    } else {

      this.setState({ eMessage: "Please fill out all fields" });

      this.setState({ isError: true });

    }

  }



  render() {

    const { errors } = this.state;

    let writeMessage;

    const isError = this.state.isError;

    if (isError) {

      writeMessage = <h4 style={{ color: "red" }}>{this.state.eMessage}</h4>

    }

    else {

      writeMessage = <h4 style={{ color: "blue" }}>{this.state.message}</h4>

    }

    return (

      <MDBContainer fluid>

        <Header />

        <div className='h-100 d-flex align-items-center justify-content-center' style={{ borderRadius: '25px' }}>



              <form onSubmit={this.handleRegister} noValidate>

                <div className='container' >



                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  {writeMessage}



                  <div className='form-group'>

                    <MDBIcon className='d-inline-flex' fas icon="user me-3" size='lg' />

                    <label htmlFor="firstName">First Name</label>

                    <input type="text" className='form-control' name='firstName' onChange={this.handleChange} noValidate />

                    {errors.firstName.length > 0 &&

                      <span style={{ color: "red" }} className='error'>{errors.firstName}</span>}

                  </div>

                  <br></br>

                  <div className='form-group'>

                    <MDBIcon fas icon="user me-3" size='lg' />

                    <label htmlFor="lastName">Last Name</label>

                    <input type="text" className='form-control' name='lastName' onChange={this.handleChange} noValidate />

                    {errors.lastName.length > 0 &&

                      <span style={{ color: "red" }} className='error'>{errors.lastName}</span>}

                  </div>

                  <br></br>

                  <div className='form-group email'>

                    <MDBIcon fas icon="envelope me-3" size='lg' />

                    <label htmlFor="email">Email</label>

                    <input type="text" className='form-control' name='email' onChange={this.handleChange} noValidate />                  

                    {errors.email.length > 0 &&

                      <span style={{ color: "red" }} className='error'>{errors.email}</span>}

                  </div>

                      <br></br>

                  <div className='form-group'>

                    <MDBIcon fas icon="phone me-3" size='lg' />

                    <label htmlFor="phone">Phone</label>

                    <input type="number" className='form-control' name='phone' onChange={this.handleChange} noValidate />

                    {errors.phone.length > 0 &&

                      <span style={{ color: "red" }} className='error'>{errors.phone}</span>}

                  </div>

                     

                  <button  type='submit' className='btn btn-primary' >Register</button>

                  <br></br><br></br>

                </div>

              </form>





        </div>



        <link

          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

        <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />



        <Footer />

      </MDBContainer>

    );

  }

}
