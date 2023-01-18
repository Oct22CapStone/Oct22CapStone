import React, { useState, useEffect } from "react";
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserRoleService from "../services/UserRoleService";


export default function ViewUser() {
  const[roles, setRoles]= useState([]);
  const[query, setQuery] = useState('');
  const[filterdata, setFilterData]= useState([]);

  const onDelete = (userId) => {
    axios.delete(`http://localhost:8181/userpage/delete/${userId}`);
    setRoles(
			roles.filter((usr) => {
			   return usr.userId !== userId;
			})
		 );
  }

  useEffect(() => {
    const getUserData= async() => {
      const req = await UserRoleService.findAllUserRole();
      setRoles(req.data);
      setFilterData(req.data);
    }
    getUserData();
  },[]);

  const handlesearch=(event)=>{
    const getSearch=event.target.value;
    if(getSearch.length > 0){
      const searchdata= roles.filter( (item)=> item.user.firstName.toLowerCase().includes(getSearch));
      setRoles(searchdata);
    } else {
      setRoles(filterdata);
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
            {roles.map((data) => {
              return (
                <Table.Row key={data.userRoleId}>
                  <Table.Cell>{data.user.firstName}</Table.Cell>
                  <Table.Cell>{data.user.lastName}</Table.Cell>
                  <Table.Cell>{data.user.email}</Table.Cell>
                  <Table.Cell>{data.role.roleName}</Table.Cell>

                  <Table.Cell>
                    <Button onClick={() => onDelete(data.user.userId)} className="btn btn-danger btn-sm rounded-5">Delete</Button>
                     
                    <Link to={`/edituser/${data.userRoleId}`}>
                    <Button className="btn btn-success btn-sm rounded-5">Edit</Button>                    
                    </Link>
                    
                  </Table.Cell>


                </Table.Row>
              )
            })}
          </Table.Body>

        <Table.Footer>
        <section className="clearfix">
          <div className="hint-text">
            Showing <b>{roles.length}</b> out of <b>{roles.length}</b> entries
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
        </section>
        </Table.Footer>
      </Table>
    </div>
    </>
    );
  }