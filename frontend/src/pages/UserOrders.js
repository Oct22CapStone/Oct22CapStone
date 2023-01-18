import useAuthUser from "../hook/getUser";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, Route, useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import UserOrdersService from "../services/UserOrdersService";



const UserOrders = () => {
	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState("");


	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
                const email = JSON.parse(localStorage.getItem("userEmail"));           
                const response = await UserService.getUserByEmail(email);  
                setUsers(response.data);   
				const result = await UserOrdersService.getAllUserOrders();
                setOrders(result.data.filter(a=>{return a.userId.userId === response.data.userId}));
			} catch(error) {
				console.log(error);
			}
		
			setLoading(false);
		};
		fetchData();
		
	}, []);

	return (				
		<>{!loading &&(
		<div>
			<Link to="/profile" className="btn btn-secondary btn-sm">Back</Link>
			<table className="table">
				<thead className="font-weight-bold">
				<tr>
			<th scope="col">Order Id</th>
            <th scope="col"></th>
      		<th scope="col">Order Date</th>
      		<th scope="col">Tracking Info</th>
      		<th scope="col">Total</th>
            <th scope="col"></th>
    		</tr>
				</thead>
				<tbody>
			{orders.map(
({orderId, orderDate, trackingInfo, totalPrice}) =>(
				
    <tr key={orderId}>
		<td>{orderId}</td>
    	<td><Link to={`/orderdetails/${orderId}`}>Order Details</Link></td>
		<td>{orderDate}</td>
		<td>{trackingInfo}</td>
        <td>${totalPrice}</td>
		<td>
    <ul className="list-inline m-0">
        <li className="list-inline-item">
            <Link to={`/help`} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top">Request Help?</Link>
        </li>
        </ul>
        </td>
	</tr>
	))}
	</tbody>
	</table>
	</div>)}
	</>
	)
};


export default UserOrders;