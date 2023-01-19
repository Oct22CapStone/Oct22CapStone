import React from 'react';
import axios from 'axios';
import Footer from '../components/Navbar/Footer';
import Header from '../components/Navbar/Header';
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
import UserRoleService from '../services/UserRoleService';
import UserService from '../services/UserService';

function RegistryForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message,setMessage] = useState('');

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (email == "" || phone == "" || firstName == "" || lastName == "") {
      alert("Please fill out all fields");
    } else {
      const val = {
        firstName,
        lastName,
        email,
        phone
      };

      await UserService.createUser(val);
      console.log(val.email);
      const newUser = await UserService.getUserByEmail(val.email);
      const role = {roleId: 2};
      const userRole ={role: role, user: newUser.data};
      await UserRoleService.createUserRole(userRole);
      setMessage("You will recieve activation email shortly!");
      clearState();
    }
  }

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
  };

  return (
    <MDBContainer fluid>
      <Header/>
    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
            <h4 style={{color: "blue"}}>{message}</h4>
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
               <MDBIcon fas icon="phone me-3" size='lg'/>
               <MDBInput label='Phone Number' value={phone} onChange={changePhone} id="phone" type='text' className='w-100'/>
            </div>

            <MDBBtn onClick={handleRegister} className='mb-4' size='lg'>Register</MDBBtn>
          </MDBCol>

          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage src= "https://i.ibb.co/cg1NqMM/logo3.jpg" fluid/>
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>

    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
    <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet"/>

    <Footer/>
  </MDBContainer>
  );

}
export default RegistryForm;