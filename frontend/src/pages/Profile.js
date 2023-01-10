import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/UserService";

const Profile = () => {

    const {id} = useParams();        
	const [address, setAddress] = useState([]);
    const [user, setUser] = useState("");

    async function deleteAddress  (id,e){
		console.log(id);
		await AddressService.delete(id);
		setAddress(
			address.filter((address) => {
			   return address.addressId !== id;
			})
		 );
   };

   const fetchAddress = async() => {
        const res = await AddressService.findAllAddresses();
        setAddress(res.data);
        setAddress(
            address.filter((a)=>{
                return a.userId === user;
            })
        );
   };

    console.log(user); 
    useEffect(() =>{	
        const fetchData  = async () => {
            try {
                const response = await UserService.getUserById(id);                                           
                setUser(response.data);
            } catch(error) {
                console.log(error);
            }
        }; 

        if(id && id !=="")
		fetchData();
        fetchAddress();
	},[id]);

    
    return (
        <>
        <section className="bg-light">
    <div className="container">
        <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
                <div className="card card-style1 border-0">
                    <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                            </div>
                            <div className="col-lg-6 px-xl-10">
                                <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                    <h3 className="h2 text-white mb-0">{user.firstName} {user.lastName}</h3>
                                </div>
                                <ul className="list-unstyled mb-1-9">
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {user.email}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number:</span> {user.phone}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 mb-4 mb-sm-5">
            </div>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                    
                    <Link to="/addaddress" className="btn btn-primary btn-sm">Add New Address</Link>
                    <table className="table">
                        <thead className="font-weight-bold">
                        <tr>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col">Zip Code</th>
                    </tr>
                        </thead>
                        <tbody>
                    {address.map(
        ({addressId, street, city, state, country, zip}) =>(
                        
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
                    <button onClick={(e)=>deleteAddress(addressId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </li>
                </ul>
                </td>
            </tr>
            ))};
            </tbody>
	</table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</>
    )
};
export default Profile;