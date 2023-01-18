import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";
import AddressService from "../services/AddressService";

const EditOrders = () => {
    const {id} = useParams();    
	  const [orders, setOrders] = useState("");

    const handleSubmit = async() =>{
        //
        //set orders date variable
        console.log(orders.orderDate);
        await UserOrdersService.update(orders.orderId, orders);
        console.log(orders.orderDate);
      };

  const handleChange = (event) => {
    if(event.target.name === "totalPrice"){
      orders.totalPrice = event.target.value;
    }

    const handleOrderDate = (event) =>{
      const newOrderDate = event.target.name;
      console.log(newOrderDate)
    }

    useEffect(() =>{	
        const fetchData  = async () => {
            try {
                const response = await UserOrdersService.getUserOrderByID(id);                                           
                setOrders(response.data);
            } catch(error) {
                console.log(error);
            }
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
              <select defaultValue={orders.addressId.addressId} name='addressId' onChange={handleChange}>
                {address.map((data)=>{return (  <option value={data.addressId} key={data.addressId}>{data.street} {data.city} {data.state} {data.zip} {data.country}</option>)})}
              </select>
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