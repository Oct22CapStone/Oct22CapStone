import styled from "styled-components";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import { Link, useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import UserRoleService from "../services/UserRoleService";


const Orders = () => {
	const history = useHistory();
	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);
	const [filterdata, setFilterData]= useState([]);
	const [query, setQuery] = useState('');

	useEffect(() =>{

		const fetchRole = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            let roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 1) {
                history.push("/");
            }
		}

		fetchRole();
		const fetchData  = async () => {
			const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 2) {
			setLoading(true);
			try {
				const ordersResponse = await UserOrdersService.getAllUserOrders();
				setOrders(ordersResponse.data);
				setFilterData(ordersResponse.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		}
	};
		fetchData();
	}, []);

	const handlesearch=(event)=>{
        const getSearch=event.target.value;
        if(getSearch.length > 0){
          const searchdata= orders.filter( (orders)=> orders.orderId == getSearch);
          setOrders(searchdata);
        } else {
          setOrders(filterdata);
        }
        setQuery(getSearch);

      }


	return (
	
		<>{!loading &&(
			<div>
				
						
				<div className=" card">
				
					<div className = "card-body text-center">
						<h2 className = "display-4 text-center fw-bold mb-2">Manage Orders</h2>	
						<input type="text" name='name' value={query} placeholder="Search by order ID:" onChange={(e)=>handlesearch(e)}></input>
					
								
					
					</div>
					
						
						<div className = "card-body">
						<div className = "row">
							<div className = "col-lg-12 mb-4 mb-sm-5">
							<table className="table table-bordered">
								<thead className = "font-weight-bold">
									<tr>
										<th>Order ID</th>
										<th>Order Details</th>
										<th>Address</th>
										<th>Order Date</th>
										<th>Tracking Info</th>
										<th>Total Price</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{orders.map(
										orders => <tr key={orders.orderId}>
											<td>{orders.orderId}</td>
											<td><Link to={`/orderdetails/${orders.orderId}`}>Order Details</Link></td>
											<td>{orders.addressId.street} {orders.addressId.city} {orders.addressId.state} {orders.addressId.zip} {orders.addressId.country}</td>
											<td>{orders.orderDate}</td>
											<td>{orders.trackingInfo}</td>
											<td>{orders.totalPrice}</td>
											<ul className="list-inline m-0">
												<li className="list-inline-item">
													<Link to={`/editorders/${orders.orderId}`} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></Link>
												</li>
											</ul>
										</tr>
										
									)}
									
								</tbody>
							</table>
					</div>
					</div>
					</div>
					</div>
					</div>
					
				
			)}
			</>
	
	);
};

const Container = styled.section`
	max-width: 90%;
	margin: 2rem auto;
	
	& h2 {
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.3rem;
	}
	& > article {
		width: 90%;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
		.card {
			margin: 1rem;
		}
	}
`;

export default Orders;