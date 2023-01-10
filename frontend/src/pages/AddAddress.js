import AddressService from "../services/AddressService";
import { Link, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import UserService from "../services/UserService";

const AddAddress = () => {   
	  const [address, setAddress] = useState("");
    const { oktaAuth, authState } = useOktaAuth();
    const [user, setUser] = useState("");

    const handleSubmit = async() =>{
        await AddressService.createAddress(address);
      };

    const handleChange = (event) =>{
      setAddress(address =>({...address, [event.target.name]: event.target.value}));
    }

     useEffect(() =>{	
        const fetchData  = async () => {
            try {
                const response = await UserService.getUser();                                                        
                setUser(response.data);
                setUser(
                    user.filter((u)=>{
                        return u.email === authState.idToken.claims.email;
                    })
                )
            } catch(error) {
                console.log(error);
            }
        }; 
		  fetchData();
       
	},[]);

    
    return (
        <>        
      <div key={address.addressId} className="container mt-5 mbclassName-5">
         <form>
      <div className="mb-3 form-group">
        <label>Street:</label>
        <input name="Street" onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3 form-group">
        <label>City:</label>
        <input name="city" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>State:</label>
        <input name="state" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>Country:</label>
        <input name="country" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>Zip Code:</label>
        <input name="zip" onChange={handleChange} className="form-control"/>
      </div>
      <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
    </div>
</>
    )
};
export default AddAddress;