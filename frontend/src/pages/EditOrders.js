import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory, useParams} from "react-router-dom";
import AddressService from "../services/AddressService";
import UserService from "../services/UserService";
import UserRoleService from "../services/UserRoleService";

const EditOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState([]);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await UserOrdersService.update(orders.orderId, orders);
  };

  const handleChange = (event) => {
    if(event.target.name === "totalPrice"){
      orders.totalPrice = event.target.value;
    }
    if(event.target.name === "trackingInfo"){
      orders.trackingInfo = event.target.value;
    }
    if(event.target.name === "addressId"){
      async function check() {
        const response = await AddressService.getAddressById(event.target.value);
          orders.addressId = response.data;
        }
        check();      
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
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    const fetchRole = async () => {
      const email = JSON.parse(localStorage.getItem("userEmail"));
      const userRes = await UserService.getUserByEmail(email);
      const roleRes = await UserRoleService.findAllUserRole();
      var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
          map(function (r) { return r.role.roleId });
      if (roles != 1) {
          history.push("/");
      }
}
  fetchRole();
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
          <button className="btn btn-primary btn-sm" type="submit" onClick={(e) => handleSubmit(e)}>
            Update
          </button>
        </form>
      </div>)}
    </>
  )
};
export default EditOrders;