import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link, Route, useHistory } from "react-router-dom";


function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const postData = () => {
    axios.post(`http://localhost:8181/userpage/save`, {
        firstName,
        lastName,
        email,
        phone,
        role
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
                  <label>Phone</label>
                  <input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} className="form-control"/>
                  </div>
              </Form.Field>
              <Form.Field>
              <div className="mb-3 form-group">
                  <label>Role</label>
                  <input placeholder='Role' onChange={(e) => setRole(e.target.value)} className="form-control"/>
                </div>
              </Form.Field>
              <Button onClick={postData} className="btn btn-primary btn-sm" type='submit'>Submit</Button>
          </Form>
      </div>
      </>
  )
}

export default CreateUser;