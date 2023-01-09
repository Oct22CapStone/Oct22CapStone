import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import UserService from "../services/UserService";


  
  function User() {
    const [user, setUser] = useState([]);

    useEffect(()=> {
        const getUser = async ()=> {
            const res = await UserService.getUser();
            setUser(res.data)
            console.log(user);
        }
        getUser();

    },[]);

    return (
      <React.Fragment>
        <Container>
          
          <div className="App">
            
            <h1>Manange Users</h1>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {
                    user.map( (getusr, key)=> {
                      return (
                        <tr key={key}>
                          <td> { getusr.user_id } </td>
                          <td> { getusr.username } </td>
                          <td> { getusr.firstName } </td>
                          <td> { getusr.lastName } </td>
                          <td> { getusr.email } </td>
                          <td> { getusr.phone } </td>
                          <td> { getusr.password } </td>
                          <td> { getusr.acc_role } </td>
                        </tr>
                      
                      )
                      })
                }

              </tbody>
            </table>
          </div>
        </Container>
      </React.Fragment>
    );
  }
  
  export default User;