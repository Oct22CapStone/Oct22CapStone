import axios from 'axios';
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
} 
from 'mdb-react-ui-kit';
import { useState } from 'react';
import UserRoleService from '../services/UserRoleService';
import UserService from '../services/UserService';

function RegistryForm() {
//destructure here 

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const mailerInfo = {//Kenzie's mail stuff
    recipient: email,
    msgBody: `${firstName}, thank you for creating an account. Please enjoy your shopping experience.`,
    subject: "Welcome to Vehicle Vault!"
  }

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password!==passwordRepeat) {
      alert("Password does not match!")
    } else {
      const val = {
        username,
        firstName,
        lastName,
        email,
        phone,
        password
      };

      axios({//More email stuff
        method: "POST",
        url:"http://localhost:8181/email/send",
        data:  mailerInfo
      })

      await UserService.createUser(val);
      console.log(val.email);
      const newUser = await UserService.getUserByEmail(val.email);
      const role = {roleId: 2};
      const userRole ={role: role, user: newUser.data};
      await UserRoleService.createUserRole(userRole);
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

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Username' value={username} id="username" onChange={changeUsername}  type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' value={firstName} onChange={changeFirstName} id="name"type='text' className='w-100'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Lastname' value={lastName} onChange={changeLastName} id="last" type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' onChange={changeEmail} value={email} id="email" type='email'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Phone' value={phone} onChange={changePhone} id="phone" type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' value={password} onChange={changePassword} id="password" type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' value={passwordRepeat} onChange={changePasswordRepeat} id="passwordRepeat" type='password'/>
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={handleRegister}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://th.bing.com/th/id/OIP.fP8ME8Bs6Ndjo50ACPnviwHaFn?pid=ImgDet&rs=1' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default RegistryForm;
