import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import OrderItemService from "../services/OrderItemService";



const Orders = () => {
    
	const [orderItems, setOrderItems] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await OrderItemService.getAllOrderItems();
				setOrderItems(response.data);
				console.log(orderItems);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);


	return (
		<Container>
            <div>
            <h2 className = "text-center">Orders List</h2>
            <div className = "row">
                <table className = "table table-bordered">
                    <thead>
                        <tr>
                            <th>Order Quantity</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems.map(
                                Orders=>
                                <tr key = {Orders.order_item_id}>
                                    <td>{Orders.product_qty}</td>
                                    <td>{Orders.order_id}</td>
                                    <td>{Orders.productid}</td>
                                </tr>

                            )
                        }
                    </tbody>

                </table>
            </div>
      </div>
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