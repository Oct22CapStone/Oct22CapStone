import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function EditUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acc_role, setAcc_role] = useState('');
  const [user_id, setUser_id] = useState(null);

    useEffect(() => {
        setUser_id(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setEmail(localStorage.getItem('Email'));
        setPhone(localStorage.getItem('Phone'));
        setAcc_role(localStorage.getItem('Role'));
    }, []);

  const putData = () => {
    axios.put(`http://localhost:8181/userpage/update/${user_id}`, {
        firstName,
        lastName,
        email,
        phone,
        acc_role
        })
    }

  return (
      <div>
          <Form className="create-form">
              <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Phone</label>
                  <input placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Role</label>
                  <input placeholder='Role' value={acc_role} onChange={(e) => setAcc_role(e.target.value)}/>
              </Form.Field>
              <Button type='submit' onClick={putData}>Update</Button>
          </Form>
      </div>
  )
}