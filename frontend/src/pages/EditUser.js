import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link, Route, useHistory } from "react-router-dom";

export default function EditUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);

    useEffect(() => {
        setUserId(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setEmail(localStorage.getItem('Email'));
        setPhone(localStorage.getItem('Phone'));
        setRole(localStorage.getItem('Role'));
    }, []);

  const putData = () => {
    axios.put(`http://localhost:8181/userpage/update/${userId}`, {
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
      <div className='container mt-5 mbclassName-5'>
          <Form className="create-form">
              <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control"/>
              </Form.Field>
              <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control"/>
              </Form.Field>
              <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"/>
              </Form.Field>
              <Form.Field>
                  <label>Phone</label>
                  <input placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control"/>
              </Form.Field>
              <Form.Field>
                  <label>Role</label>
                  <input placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} className="form-control"/>
              </Form.Field>
              <Button onClick={putData} className="btn btn-primary btn-sm" type='submit'>Update</Button>
          </Form>
      </div>
    </>
  )
}