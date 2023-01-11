import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";



const Orders = () => {
	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();

	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await UserOrdersService.getAllUserOrders();
				setOrders(response.data);
				console.log(orders);
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
										<th>User ID</th>
										<th>Order Date</th>
										<th>Tracking Info</th>
										<th>Total Price</th>
									</tr>
								</thead>
								<tbody>
									{orders.map(
										orders => <tr key={orders.order_id}>
											<td>{orders.order_id}</td>
											<td>{orders.user_id}</td>
											<td>{orders.order_date}</td>
											<td>{orders.tracking_info}</td>
											<td>{orders.total_price}</td>
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