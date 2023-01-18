import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";
import AddressService from "../services/AddressService";



const Orders = () => {

	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);
	const[filterdata, setFilterData]= useState([]);
	const [query, setQuery] = useState('');

	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const ordersResponse = await UserOrdersService.getAllUserOrders();
				setOrders(ordersResponse.data);
				setFilterData(ordersResponse.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
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
		<Container>
			{
				<>
					{!loading && (
						<><h2 className="text-center">Orders</h2><article>		
							<table className="table table-bordered">
								<thead>
								<div className="container">
								<input type="text" name='name' value={query} placeholder="Search by order ID:" onChange={(e)=>handlesearch(e)}></input>
								</div>
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
						</article></>)}
				</>
			}
		</Container>
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