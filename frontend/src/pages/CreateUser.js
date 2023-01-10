import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acc_role, setAcc_role] = useState('');



  const postData = () => {
    axios.post(`http://localhost:8181/userpage/save`, {
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
                  <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Phone</label>
                  <input placeholder='Phone' onChange={(e) => setPhone(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Role</label>
                  <input placeholder='Role' onChange={(e) => setAcc_role(e.target.value)}/>
              </Form.Field>
              <Button onClick={postData} type='submit'>Submit</Button>
          </Form>
      </div>
  )
}

export default CreateUser;