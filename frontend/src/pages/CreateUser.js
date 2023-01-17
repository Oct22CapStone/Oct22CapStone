import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();

  const mailerInfo = {
    recipient: email,
    msgBody: `${firstName}, thank you for creating an account. Please enjoy your shopping experience.`,
    subject: "Welcome to Vehicle Vault!"
  }

  const postData = () => {
    axios.post(`http://localhost:8181/userpage/save`, {
        firstName,
        lastName,
        email,
        role
    })//ADD A PAUSE HERE. HOW??
    history.push("/users");//REDIRECT IS TOO FAST.
    axios({
      method: "POST",
      url:"http://localhost:8181/email/send",
      data:  mailerInfo
    })
  }

  return (
    <>
    <Link to="/users" className="btn btn-secondary btn-sm">Back</Link>
    <div className="container mt-5 mbclassName-5">
          <Form className="create-form">
              <Form.Field>
              <div className="mb-3 form-group">
                  <label>First Name</label>
                  <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} className="form-control"/>
                  </div>
              </Form.Field>
              <Form.Field>
              <div className="mb-3 form-group">
                  <label>Last Name</label>
                  <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} className="form-control"/>
                </div>
              </Form.Field>
              <Form.Field>
              <div className="mb-3 form-group">
                  <label>Email</label>
                  <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} className="form-control"/>
              </div>
              </Form.Field>
              <Form.Field>
              <div className="mb-3 form-group">
                  <label>Role</label>
                  <input placeholder='Role' onChange={(e) => setRole(e.target.value)} className="form-control"/>
                </div>
              </Form.Field>
              <Button onClick={postData} className="btn btn-primary btn-sm" type='submit' redirect="/users">Submit</Button>
          </Form>
      </div>
      </>
  )
}

export default CreateUser;