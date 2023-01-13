import React from 'react';

import axios from 'axios';

import Footer from '../components/Navbar/Footer'

import Header from '../components/Navbar/Header'

import {

  MDBBtn,

  MDBContainer,

  MDBRow,

  MDBCol,

  MDBCard,

  MDBCardBody,

  MDBCardImage,

  MDBInput,

  MDBIcon,

  MDBCheckbox

}

from 'mdb-react-ui-kit';



import { useState } from 'react';



function RegistryForm() {

//destructure here



  const [username, setUsername] = useState('');

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [password, setpassword] = useState('');

  const [passwordRepeat, setPasswordRepeat] = useState('');

  const role='Customer';



  const changeUsername = (event) => {

    setUsername(event.target.value);

  };



  const changeFirstName = (event) => {

    setFirstName(event.target.value);

  };



  const changeLastName = (event) => {

    setLastName(event.target.value);

  };



  const changeEmail = (event) => {

    setEmail(event.target.value);

  };



  const changePhone = (event) => {

    setPhone(event.target.value);

  };



  const changePassword = (event) => {

    setpassword(event.target.value);

  };



  const changePasswordRepeat = (event) => {

    setPasswordRepeat(event.target.value);

  };



  const handleRegister = (event) => {

    event.preventDefault();



    if (password!==passwordRepeat) {

      alert("Password does not match!")

    } else {

      const val = {

        username,

        firstName,

        lastName,

        email,

        password,

        role,
      };

      axios.post("http://localhost:8181/userpage/save", val);

      clearState();

    }

  }

  const clearState = () => {

    setUsername('');

    setFirstName('');

    setLastName('');

    setEmail('');

    setPhone('');

    setpassword('');

    setPasswordRepeat('');

  };





  return (

    <MDBContainer fluid>



      <Header/>



    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>

      <MDBCardBody>

        <MDBRow>

          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>



            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>



            <div className="d-flex flex-row align-items-center mb-4 ">

               <MDBIcon fas icon="user me-3" size='lg'/>

              <MDBInput label='Username' value={username} id="username" onChange={changeUsername}  type='text' className='w-100'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4 ">

               <MDBIcon fas icon="user me-3" size='lg'/>

               <MDBInput label='First Name' value={firstName} onChange={changeFirstName} id="name"type='text' className='w-100'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4 ">

               <MDBIcon fas icon="user me-3" size='lg'/>

               <MDBInput label='Last Name' value={lastName} onChange={changeLastName} id="last" type='text' className='w-100'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4">

              <MDBIcon fas icon="envelope me-3" size='lg'/>

              <MDBInput label='Email Address' onChange={changeEmail} value={email} id="email" type='email'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4 ">

               <MDBIcon fas icon="user me-3" size='lg'/>

               <MDBInput label='Phone Number' value={phone} onChange={changePhone} id="phone" type='text' className='w-100'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4">

              <MDBIcon fas icon="lock me-3" size='lg'/>

              <MDBInput label='Password' value={password} onChange={changePassword} id="password" type='password'/>

            </div>



            <div className="d-flex flex-row align-items-center mb-4">

              <MDBIcon fas icon="key me-3" size='lg'/>

              <MDBInput label='Repeat your password' value={passwordRepeat} onChange={changePasswordRepeat} id="passwordRepeat" type='password'/>

            </div>



            <div className='mb-4'>

              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />

            </div>



            <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>

            

          </MDBCol>



          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>

            <MDBCardImage src='https://www.logodesign.net/logo/line-art-car-with-swoosh-5986ld.png' fluid/>

          </MDBCol>

          

        </MDBRow>

      </MDBCardBody>

    </MDBCard>





    <link

      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"

      rel="stylesheet"

      />

    <link

      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"

      rel="stylesheet"

      />



    <Footer/>

  </MDBContainer>

  

  );

}



export default RegistryForm;