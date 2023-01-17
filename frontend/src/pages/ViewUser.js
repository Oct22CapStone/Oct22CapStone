import React, { useState, useEffect } from "react";
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserRoleService from "../services/UserRoleService";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { ServerStyleSheet } from "styled-components";


export default function ViewUser() {
  //const [user, setUser] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const[filterdata, setFilterData]= useState([]);
  const [query, setQuery] = useState('');
  const[roles, setRoles] = useState([]);

  const onDelete = (userId) => {
    axios.delete(`http://localhost:8181/userpage/delete/${userId}`);
    setAPIData(
			APIData.filter((usr) => {
			   return usr.userId !== userId;
			})
		 );
  }

  // const onSearch = (userId) => {
  //   return UserService.getUserById(userId);
  // }
  const setData = (data) => {
    console.log(data);
    let { userId, firstName, lastName, email, phone, role } = data;
    localStorage.setItem('ID', userId);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone', phone);
    localStorage.setItem('Role', role)
}


// useEffect(() => {
//   axios.get(`http://localhost:8181/userpage/show`)
//   .then((response) => {
//       setAPIData(response.data);
//   })
// }, [])

useEffect(() => {

  const getUserData= async() => {
    const reqData= await fetch("http://localhost:8181/userpage/show");
    const resData= await reqData.json();
    setAPIData(resData);
    setFilterData(resData);
  }

  const getRoleData= async() => {
    const req = await UserRoleService.findAllUserRole();
    setRoles(req.data);
    //setFilterData(req.data);??
  }

  getUserData();
  getRoleData();
},[]);

  const handlesearch=(event)=>{
    const getSearch=event.target.value;
    if(getSearch.length > 0){
      const searchdata= APIData.filter( (item)=> item.firstName.toLowerCase().includes(getSearch));
      setAPIData(searchdata);
    } else {
      setAPIData(filterdata);
    }
    setQuery(getSearch);

  }


  return (
    <>
    <div className="container mt-5 mbclassName-5">
      <Table singleLine>
          <Table.Header>
            <span>
              <div className="container">
              <input type="text" name='name' value={query} placeholder="Search by first name.." onChange={(e)=>handlesearch(e)}></input>
              </div>
              <div className="container">
                <Link to='/adduser' className="btn btn-primary btn-sm rounded-5"> Add New</Link>
                </div>
                </span>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
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
                  <Table.Cell>{data.roleName}</Table.Cell>

                  <Table.Cell>
                    <Button onClick={() => onDelete(data.userId)} className="btn btn-danger btn-sm rounded-5">Delete</Button>
                    <Link to='/edituser'>
                    <Table.Cell> 
                    <Button onClick={() => setData(data)} className="btn btn-success btn-sm rounded-5">Update</Button>
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
    </>
    );
  }
