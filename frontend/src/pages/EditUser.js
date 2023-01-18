import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link, Route, useHistory, useParams } from "react-router-dom";
import UserRoleService from '../services/UserRoleService';
import UserService from '../services/UserService';

export default function EditUser() {
  const { id } = useParams();
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    if(event.target.name === "role.roleId"){
      roles.role.roleId = event.target.value;
    }
    if(event.target.name === "user.firstName"){
      roles.user.firstName = event.target.value;
    }
    if(event.target.name === "user.lastName"){
      roles.user.lastName = event.target.value;
    }
    if(event.target.name === "user.email"){
      roles.user.email = event.target.value;
    }    
  }

  const putData = async () => {
    await UserRoleService.update(roles.userRoleId, roles);
    await UserService.update(roles.user.userId, roles.user);    
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserRoleService.getUserRoleById(id);
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (id && id !== "")
      fetchData();
  }, [id]);

  return (
    <>
      {!loading && (
        <div key={roles.userRoleId} className="container mt-5 mbclassName-5">
          <Link to="/viewuser" className="btn btn-secondary btn-sm">Back</Link>
          <Form className="create-form">
            <Form.Field>
              <label>First Name</label>
              <input name='user.firstName' placeholder='First Name' defaultValue={roles.user.firstName} onChange={handleChange} className="form-control" />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input name="user.lastName" placeholder='Last Name' defaultValue={roles.user.lastName} onChange={handleChange} className="form-control" />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input name='user.email' placeholder='Email' defaultValue={roles.user.email} onChange={handleChange} className="form-control" />
            </Form.Field>
            <Form.Field>
              <label>
                Role
                <br></br>
                <select defaultValue={roles.role.roleId} name='role.roleId' onChange={handleChange}>
                  <option value="1">Admin</option>
                  <option value="2">Customer</option>
                </select>
              </label>              
            </Form.Field>
            <button className="btn btn-primary btn-sm" type="submit" onClick={putData}>
            Update
          </button>
          </Form>
        </div>
      )}
    </>
  )
}