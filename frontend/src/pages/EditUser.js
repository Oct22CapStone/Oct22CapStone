import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import UserService from "../services/UserService";

  function EditUser() {
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

        <div id="editUserModal" className="modal fade">
            <div className="modal-dialog">
            <div className="modal-content">
                <form>
                <div className="modal-header">
                    <h4 className="modal-title">Edit User</h4>
                    <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    >
                    ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                    <label>First</label>
                    <input type="email" className="form-control" required="" />
                    </div>
                    <div className="form-group">
                    <label>Last</label>
                    <input type="email" className="form-control" required="" />
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" required="" />
                    </div>
                    <div className="form-group">
                    <label>Phone</label>
                    <input type="email" className="form-control" required="" />
                    </div>
                    <div className="form-group">
                    <label>Role</label>
                    <input type="email" className="form-control" required="" />
                    </div>
                </div>
                <div className="modal-footer">
                    <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                    />
                    <input type="submit" className="btn btn-info" defaultValue="Save" />
                </div>
                </form>
            </div>
            </div>
        </div>
    );
  }
  export default EditUser;