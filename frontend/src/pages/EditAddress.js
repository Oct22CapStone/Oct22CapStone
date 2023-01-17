import AddressService from "../services/AddressService";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditAddress = () => {  
    const {id} = useParams();  
	const [address, setAddress] = useState("");

    const handleSubmit = async() =>{
        await AddressService.update(address.addressId, address);
      };

    const handleChange = (event) =>{
      setAddress(address =>({...address, [event.target.name]: event.target.value}));
    }

     useEffect(() =>{	
        const fetchData  = async () => {
            try {
                const response = await AddressService.getAddressById(id);                    
                setAddress(response.data);
            } catch(error) {
                console.log(error);
            }
        }; 

        if(id && id !=="")
		    fetchData();
	},[id]);

    
    return (
        <>     
        <Link to="/profile" className="btn btn-secondary btn-sm">Back</Link>   
      <div key={address.addressId} className="container mt-5 mbclassName-5">
         <form>
      <div className="mb-3 form-group">
        <label>Street:</label>
        <input defaultValue={address.street} name="street" onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3 form-group">
        <label>City:</label>
        <input defaultValue={address.city} name="city" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>State:</label>
        <input defaultValue={address.state} name="state" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>Country:</label>
        <input defaultValue={address.country} name="country" onChange={handleChange} className="form-control"/>
      </div>
      <div className="mb-3 form-group">
        <label>Zip Code:</label>
        <input defaultValue={address.zip} name="zip" onChange={handleChange} className="form-control"/>
      </div>
      <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>
        Update
      </button>
    </form>
    </div>
</>
    )
};
export default EditAddress;