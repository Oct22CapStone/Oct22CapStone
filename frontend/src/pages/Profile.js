import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { useOktaAuth } from "@okta/okta-react";
import useAuthUser from "../hook/getUser";

const Profile = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const userInfo = useAuthUser();
    const [address, setAddress] = useState([]);
    const [users, setUsers] = useState("");
    const [loading, setLoading] = useState(true);


    async function deleteAddress(id, e) {
        console.log(id);
        await AddressService.delete(id);
        setAddress(
            address.filter((address) => {
                return address.addressId !== id;
            })
        );
    };

    useEffect(() => {
        const fetchData  = async () => {        
            try { 
                setLoading(true);  
                const email = JSON.parse(localStorage.getItem("userEmail"));       
                const response = await UserService.getUserByEmail(email);  
                setUsers(response.data);   
                const result = await AddressService.findAllAddresses();
                setAddress(result.data.filter(a=>{return a.userId.userId === response.data.userId}));
            } catch(error) {
                console.log(error);
            }   
            setLoading(false);         
        }; 

        fetchData();
    }, []);


    return (
        <>{!loading && (
            <section style={{ backgroundColor: "#fdddc3" }}>
                <div className="container py-5">
                    <div className="row">
                    <div className="col-lg-4">
                       <div className="card mb-4">
                           <div className="card-body text-center">
                               <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="Admin" class="rounded-circle" width="150"></img>
                               <h5 className="my-3">{userInfo?.given_name} {userInfo?.family_name}</h5>
                               <p className="text-muted mb-1">Customer</p>
                               <div className = "mb-1">
                                    <Link to="/userorders" className = "btn-link btn active">My Orders</Link>
                                </div>
                           </div>
                           
                           
                       </div>
                   </div>

                   <div className = "col">
                       <div className="card mb-4">
                           <div className="card-body text-center">
                            <h3>Your Information</h3>
                                <div className="row">
                                <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Full Name:</span> {userInfo?.given_name} {userInfo?.family_name}</li>
                                    </ul>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {users.email}</li>
                                    </ul>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Username:</span> {userInfo?.preferred_username}</li>
                                    </ul>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number:</span> Add User Phone Var</li>
                                    </ul>
                                   
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className = "col">
                       <div className="card mb-4">
                           <div className="card-body text-center">
                            <h3>Social</h3>
                                <div className="row">
                                <ul class="list-group list-group-flush rounded-3">
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fas fa-globe fa-lg text-warning" ></i>
                                        <p class="mb-0">https://{userInfo?.given_name}{userInfo?.family_name}.com</p>
                                    </li>
                                 

                               
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-facebook-f fa-lg" style={{color: "#2239FC" }}></i>
                                        <p class="mb-0">https://facebook.com/{userInfo?.given_name}{userInfo?.family_name}</p>
                                    </li>
                                 

                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-instagram fa-lg" style={{color: "#8B22FC" }}></i>
                                        <p class="mb-0">https://instagram.com/{userInfo?.given_name}{userInfo?.family_name}</p>
                                    </li>

                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-twitter fa-lg" style={{color: "#00D1FF" }}></i>
                                        <p class="mb-0">https://twitter.com/{userInfo?.given_name}{userInfo?.family_name}</p>
                                    </li>
                                 

                                 
                                    
                                 </ul>


                                 
                                   
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>

                

                    <div>
                       <div className="card">
                           <div className="card-body text-center">
                                <h3> Your Addresses</h3>
                                <div>
                                <Link to="/addaddress" className="btn btn-primary mb-4">Add New Address</Link>
                                </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-4 mb-sm-5">
                                            <table className="table table-bordered">
                                       <thead className="font-weight-bold">
                                           <tr>
                                               <th scope="col">Street</th>
                                               <th scope="col">City</th>
                                               <th scope="col">State</th>
                                               <th scope="col">Country</th>
                                               <th scope="col">Zip Code</th>
                                               <th scope="col">Manage</th>
                                           </tr>
                                       </thead>
                                       <tbody>
                                           {address.map(
                                               ({ addressId, street, city, state, country, zip, userId }) => (
                                                   <tr key={addressId}>
                                                       <td>{street}</td>
                                                       <td>{city}</td>
                                                       <td>{state}</td>
                                                       <td>{country}</td>
                                                       <td>{zip}</td>
                                                       <td>
                                                           <ul className="list-inline m-0">
                                                               <li className="list-inline-item">
                                                                   <Link to={`/editaddress/${addressId}`} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></Link>
                                                               </li>
                                                               <li className="list-inline-item">
                                                                   <button onClick={(e) => deleteAddress(addressId, e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                                                               </li>
                                                           </ul>
                                                       </td>
                                                   </tr>
                                               ))}
                                       </tbody>
                                   </table>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>


                    


    
                   </div>
                   </div>
                   </section>)}
                   </>
                


    )
};
export default Profile;