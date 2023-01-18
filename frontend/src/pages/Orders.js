import styled from "styled-components";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";


const Orders = () => {


	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const ordersResponse = await UserOrdersService.getAllUserOrders();
				setOrders(ordersResponse.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<Container>
			{
				<>
					{!loading && (
						<><h2 className="text-center">Orders</h2><article>		
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Order ID</th>
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