import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import '../components/ModalFormat.css';
import { Container } from "react-bootstrap";

  function ViewUser() {
    const [user, setUser] = useState([]);

    // const [firstName_update, setFirstName_update] = useState('');

    useEffect(()=> {
        const getUser = async ()=> {
            const res = await UserService.getUser();
            setUser(res.data)
            console.log(user);
        }

        // const editUser = async ()=> {
        //   const res = await UserService.getUser();
        //   setFirstName_update(res.data)
        //   console.log(firstName_update);
        // }

        getUser();
        // editUser();

    },[]);



//Make the DIV element draggagle:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById("editUserModal"));
dragElement(document.getElementById("addUserModal"));
dragElement(document.getElementById("deleteUserModal"));

    return (
<>




{/* These links are necessary to see the edit and delete icons for each user row */}
  <title>Bootstrap CRUD Data Table for Database with Modal Form</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
  />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <style
    // dangerouslySetInnerHTML={{
    //   __html:
    //     '\nbody {\n\tcolor: #566787;\n\tbackground: #f5f5f5;\n\tfont-family: \'Varela Round\', sans-serif;\n\tfont-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n\tbackground: #fff;\n\tpadding: 20px 25px;\n\tborder-radius: 3px;\n\tmin-width: 1000px;\n\tbox-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {        \n\tpadding-bottom: 15px;\n\tbackground: #435d7d;\n\tcolor: #fff;\n\tpadding: 16px 30px;\n\tmin-width: 100%;\n\tmargin: -20px -25px 10px;\n\tborder-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n\tmargin: 5px 0 0;\n\tfont-size: 24px;\n}\n.table-title .btn-group {\n\tfloat: right;\n}\n.table-title .btn {\n\tcolor: #fff;\n\tfloat: right;\n\tfont-size: 13px;\n\tborder: none;\n\tmin-width: 50px;\n\tborder-radius: 2px;\n\tborder: none;\n\toutline: none !important;\n\tmargin-left: 10px;\n}\n.table-title .btn i {\n\tfloat: left;\n\tfont-size: 21px;\n\tmargin-right: 5px;\n}\n.table-title .btn span {\n\tfloat: left;\n\tmargin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n\tborder-color: #e9e9e9;\n\tpadding: 12px 15px;\n\tvertical-align: middle;\n}\ntable.table tr th:first-child {\n\twidth: 60px;\n}\ntable.table tr th:last-child {\n\twidth: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n\tbackground-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n\tbackground: #f5f5f5;\n}\ntable.table th i {\n\tfont-size: 13px;\n\tmargin: 0 5px;\n\tcursor: pointer;\n}\t\ntable.table td:last-child i {\n\topacity: 0.9;\n\tfont-size: 22px;\n\tmargin: 0 5px;\n}\ntable.table td a {\n\tfont-weight: bold;\n\tcolor: #566787;\n\tdisplay: inline-block;\n\ttext-decoration: none;\n\toutline: none !important;\n}\ntable.table td a:hover {\n\tcolor: #2196F3;\n}\ntable.table td a.edit {\n\tcolor: #FFC107;\n}\ntable.table td a.delete {\n\tcolor: #F44336;\n}\ntable.table td i {\n\tfont-size: 19px;\n}\ntable.table .avatar {\n\tborder-radius: 50%;\n\tvertical-align: middle;\n\tmargin-right: 10px;\n}\n.pagination {\n\tfloat: right;\n\tmargin: 0 0 5px;\n}\n.pagination li a {\n\tborder: none;\n\tfont-size: 13px;\n\tmin-width: 30px;\n\tmin-height: 30px;\n\tcolor: #999;\n\tmargin: 0 2px;\n\tline-height: 30px;\n\tborder-radius: 2px !important;\n\ttext-align: center;\n\tpadding: 0 6px;\n}\n.pagination li a:hover {\n\tcolor: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n\tbackground: #03A9F4;\n}\n.pagination li.active a:hover {        \n\tbackground: #0397d6;\n}\n.pagination li.disabled i {\n\tcolor: #ccc;\n}\n.pagination li i {\n\tfont-size: 16px;\n\tpadding-top: 6px\n}\n.hint-text {\n\tfloat: left;\n\tmargin-top: 10px;\n\tfont-size: 13px;\n}    \n/* Custom checkbox */\n.custom-checkbox {\n\tposition: relative;\n}\n.custom-checkbox input[type="checkbox"] {    \n\topacity: 0;\n\tposition: absolute;\n\tmargin: 5px 0 0 3px;\n\tz-index: 9;\n}\n.custom-checkbox label:before{\n\twidth: 18px;\n\theight: 18px;\n}\n.custom-checkbox label:before {\n\tcontent: \'\';\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n\tvertical-align: text-top;\n\tbackground: white;\n\tborder: 1px solid #bbb;\n\tborder-radius: 2px;\n\tbox-sizing: border-box;\n\tz-index: 2;\n}\n.custom-checkbox input[type="checkbox"]:checked + label:after {\n\tcontent: \'\';\n\tposition: absolute;\n\tleft: 6px;\n\ttop: 3px;\n\twidth: 6px;\n\theight: 11px;\n\tborder: solid #000;\n\tborder-width: 0 3px 3px 0;\n\ttransform: inherit;\n\tz-index: 3;\n\ttransform: rotateZ(45deg);\n}\n.custom-checkbox input[type="checkbox"]:checked + label:before {\n\tborder-color: #03A9F4;\n\tbackground: #03A9F4;\n}\n.custom-checkbox input[type="checkbox"]:checked + label:after {\n\tborder-color: #fff;\n}\n.custom-checkbox input[type="checkbox"]:disabled + label:before {\n\tcolor: #b8b8b8;\n\tcursor: auto;\n\tbox-shadow: none;\n\tbackground: #ddd;\n}\n/* Modal styles */\n.modal .modal-dialog {\n\tmax-width: 400px;\n}\n.modal .modal-header, .modal .modal-body, .modal .modal-footer {\n\tpadding: 20px 30px;\n}\n.modal .modal-content {\n\tborder-radius: 3px;\n\tfont-size: 14px;\n}\n.modal .modal-footer {\n\tbackground: #ecf0f1;\n\tborder-radius: 0 0 3px 3px;\n}\n.modal .modal-title {\n\tdisplay: inline-block;\n}\n.modal .form-control {\n\tborder-radius: 2px;\n\tbox-shadow: none;\n\tborder-color: #dddddd;\n}\n.modal textarea.form-control {\n\tresize: vertical;\n}\n.modal .btn {\n\tborder-radius: 2px;\n\tmin-width: 100px;\n}\t\n.modal form label {\n\tfont-weight: normal;\n}\t\n'
    // }}
    
    />
    <body>

  <div className="container-xl">
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Manage <b>Users</b>
              </h2>
            </div>
<Container>

{/* ADD USER BUTTON */}
<a href="#addUserModal"> 
  <button>ADD NEW USER</button>
  </a>
  {/* ADD A USER MODAL */}
<div id="addUserModal" className="lightbox">
  <div className="box"><a className="close" href="#">X</a>
    <p className="title">Add User</p>
      <div className="content">
        <div className="modal-body">
            <div className="form-group">
              <label>First</label>
              <input type="text" className="form-control" required="" />
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
              <input type="text" className="form-control" required="" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="email" className="form-control" required="" />
            </div>
          </div>
          <div className="clearfix">
            <a href="#"><button type="button" className="cancelbtn">Cancel</button></a>
            <button type="button" className="submitbtn">Add</button>
          </div>
      </div>
    </div>
  </div>

{/* DELETE USER BUTTON */}
<a href="#deleteUserModal"> 
  <button>DELETE SELECTED</button>
  </a>
  {/* DELETE A USER MODAL */}
<div id="deleteUserModal" className="lightbox">
  <div className="box"><a className="close" href="#">X</a>
    <p className="title">Delete User</p>
      <div className="container">
      <p>Are you sure you want to delete this user?</p>
      <div className="clearfix">
        <a href="#"><button type="button" className="cancelbtn">Cancel</button></a>
        <button type="button" className="submitbtn">Delete User</button>
      </div>
    </div>
    </div>
  </div>

{/* EDIT USER LINK TO MODAL */}
  <a href="#editUserModal"> </a>
  {/* EDIT A USER MODAL */}
<div id="editUserModal" className="lightbox">
  <div className="box"><a className="close" href="#">X</a>
    <p className="title">Edit User</p>
      <div className="content">
      <div className="modal-body">
            <div className="form-group">
              <label>First</label>
              <input type="text" className="form-control" required="" />
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
              <input type="text" className="form-control" required="" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="email" className="form-control" required="" />
            </div>
          </div>
          <div className="clearfix">
            <a href="#"><button type="button" className="cancelbtn">Cancel</button></a>
            <button type="button" className="submitbtn">Submit</button>
          </div>
      </div>
    </div>
  </div>


  </Container>

          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <span className="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <label htmlFor="selectAll" />
                </span>
              </th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

          {
            user.map( (getusr, id)=> {
              return (
                <tr key={id}>
                  <td>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="options[]"
                        defaultValue={1}
                      />
                      <label htmlFor="checkbox1" />
                      </span>
                  </td>
                  <td> { getusr.firstName } </td>
                  <td> { getusr.lastName } </td>
                  <td> { getusr.email } </td>
                  <td> { getusr.phone } </td>
                  <td> { getusr.acc_role } </td>
                  <td>

                    <a href="#editUserModal" className="edit" data-toggle="modal">
                      <i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>

                    <a href="#deleteUserModal" className="delete" data-toggle="modal">
                      <i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>

                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="clearfix">
          <div className="hint-text">
            Showing <b>{user.length}</b> out of <b>{user.length}</b> entries
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
      </div>
    </div>
  </div>
  </body>

</>
    );
  }
  export default ViewUser;
  