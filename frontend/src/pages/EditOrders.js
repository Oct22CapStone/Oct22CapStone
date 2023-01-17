import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";

const EditOrders = () => {
    const {id} = useParams();    
	  const [orders, setOrders] = useState("");
    const history = useHistory();

    const handleSubmit = async() =>{
        //
        //set orders date variable
        console.log(orders.orderDate);
        await UserOrdersService.update(orders.orderId, orders);
        console.log(orders.orderDate);
      };

    const handleChange = (event) =>{
      setOrders(orders =>({...orders, [event.target.name]: event.target.value}));
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



        if(id && id !=="")
		    fetchData();
	},[id]);

    
    return (
        <>        
      <Link to="/orders" className="btn btn-secondary btn-sm">Back</Link>
      <div key={orders.orderId} className="container mt-5 mbclassName-5">
         <form>
      <div className="mb-3 form-group">
        <label>Total Price:</label>
        <input name="totalPrice" onChange={handleChange} className="form-control" defaultValue={orders.totalPrice}/>
      </div>
      <div className="mb-3 form-group">
        <label>Tracking Info:</label>
        <textarea maxLength={255} name="trackingInfo" onChange={handleChange} className="form-control" defaultValue={orders.trackingInfo}></textarea>
      </div>
      <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>
        Update
      </button>
    </form>
    </div>
</>
    )
};
export default EditOrders;