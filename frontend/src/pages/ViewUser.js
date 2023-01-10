import React, { useState, useEffect } from "react";
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewUser() {
  //const [user, setUser] = useState([]);

  const onDelete = (user_id) => {
    axios.delete(`http://localhost:8181/userpage/delete/${user_id}`);
  }

  const setData = (data) => {
    console.log(data);
    let { user_id, firstName, lastName, email, phone, acc_role } = data;
    localStorage.setItem('ID', user_id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone', phone);
    localStorage.setItem('Role', acc_role)
}

const [APIData, setAPIData] = useState([]);

useEffect(() => {
  axios.get(`http://localhost:8181/userpage/show`)
  .then((response) => {
      setAPIData(response.data);
  })
}, [])

  return (
    <div>
      <Table singleLine>

          <Table.Header>
            <h1>All <b>Users</b></h1> <b> 
              <h4>
              <Link to='/user/post'>
              <Table.Cell> 
              <Button>Add New User</Button>
              </Table.Cell>
            </Link></h4></b>


            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.email}</Table.Cell>
                  <Table.Cell>{data.phone}</Table.Cell>
                  <Table.Cell>{data.acc_role}</Table.Cell>

                  <Table.Cell>
                    <Button onClick={() => onDelete(data.user_id)}>Delete</Button>
                    <Link to='/user/put'>
                    <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                    </Table.Cell>
                    </Link>
                  </Table.Cell>


                </Table.Row>
              )
            })}
          </Table.Body>

        <Table.Footer>
        <div className="clearfix">
          <div className="hint-text">
            Showing <b>{APIData.length}</b> out of <b>{APIData.length}</b> entries
          </div>
          <ul className="pagination">
            <li className="page-item disabled"><a href="#">Previous</a></li>
            <li className="page-item active"><a href="#" className="page-link">1</a></li>
            <li className="page-item"><a href="#" className="page-link">2</a></li>
            <li className="page-item"><a href="#" className="page-link">3</a></li>
            <li className="page-item"><a href="#" className="page-link">4</a></li>
            <li className="page-item"><a href="#" className="page-link">5</a></li>
            <li className="page-item"><a href="#" className="page-link">Next</a></li>
          </ul>
        </div>
        </Table.Footer>
      </Table>
    </div>
    );
  }