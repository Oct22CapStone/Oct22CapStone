import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";
import AddressService from "../services/AddressService";

const EditOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState([]);

  const handleSubmit = async () => {
    await UserOrdersService.update(orders.orderId, orders);
  };

  const handleChange = (event) => {
    if(event.target.name === "totalPrice"){
      orders.totalPrice = event.target.value;
    }
    if(event.target.name === "trackingInfo"){
      orders.trackingInfo = event.target.value;
      console.log(orders);
    }
    if(event.target.name === "addressId"){
      orders.addressId.addressId = event.target.value;
      console.log(orders);
    }      
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {        
        const response = await UserOrdersService.getById(id);
        setOrders(response.data);
        const result = await AddressService.findAllAddresses();
        setAddress(result.data.filter(a=>{return a.userId.userId === response.data.userId.userId}));
        console.log(result.data.map(a=>a.addressId));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };



    if (id && id !== "")
      fetchData();
  }, [id]);


  return (
    <>
    <Link to="/orders" className="btn btn-secondary btn-sm">Back</Link>
    {!loading && (      
      <div key={orders.orderId} className="container mt-5 mbclassName-5">
        <form>
          <div className="mb-3 form-group">
            <label>Total Price:</label>
            <input name="totalPrice" onChange={handleChange} className="form-control" defaultValue={orders.totalPrice} />
          </div>
          <div className="mb-3 form-group">
            <label>Tracking Info:</label>
            <input name="trackingInfo" onChange={handleChange} className="form-control" defaultValue={orders.trackingInfo}></input>
          </div>
          <div className="mb-3 form-group">
            <label>
              Address
              <br></br>
              
            </label>
          </div>
          <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>)}
    </>
  )
};
export default EditOrders;