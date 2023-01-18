import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import { Table, Button } from 'semantic-ui-react';
import styled from "styled-components";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import { Link, Route, useHistory } from "react-router-dom";



const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('');
	const [filterdata, setFilterData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const ordersResponse = await UserOrdersService.getAllUserOrders();
				console.log(ordersResponse);
				setOrders(ordersResponse.data);
				setFilterData(ordersResponse.data)
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	const handlesearch = (event) => {
		const getSearch = event.target.value;
		if (getSearch.length > 0) {
			const searchdata = orders.filter((order) => order.orderId == getSearch);
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
							<Table singleLine>
          <Table.Header>
            <span>
              <div className="container">
              <input type="text" value={query} placeholder="Search by Order ID.." onChange={(e)=>handlesearch(e)}></input>
              </div>
                </span>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>	
			  <Table.HeaderCell>Order Details</Table.HeaderCell>					  		  
              <Table.HeaderCell>Address</Table.HeaderCell>	  
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Tracking Info</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>				  
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map((data) => {
              return (
                <Table.Row key={data.orderId}>
                  <Table.Cell>{data.orderId}</Table.Cell>
				  <Table.Cell><Link to={`/orderdetails/${data.orderId}`}>Order Details</Link></Table.Cell>
                  <Table.Cell>{data.addressId.street}<br></br>{data.addressId.city} {data.addressId.state}
				  	<br></br>{data.addressId.zip} {data.addressId.country}
				  </Table.Cell>
                  <Table.Cell>{data.orderDate}</Table.Cell>
                  <Table.Cell>{data.trackingInfo}</Table.Cell>
                  <Table.Cell>{data.totalPrice}</Table.Cell>

                  <Table.Cell>                     
                    <Link to={`/editorders/${data.orderId}`}>
                    <Button className="btn btn-success btn-sm rounded-5">Edit</Button>                    
                    </Link>
                    
                  </Table.Cell>


                </Table.Row>
              )})}
          </Table.Body>

        <Table.Footer>
        <section className="clearfix">
          <div className="hint-text">
            Showing <b>{orders.length}</b> out of <b>{orders.length}</b> entries
          </div>
          <ul className="pagination">
            <li className="page-item disabled"><a href="#">Previous</a></li>
            <li className="page-item active"><a href="#" className="page-link">1</a></li>
            <li className="page-item"><a href="#" className="page-link">2</a></li>
            <li className="page-item"><a href="#" className="page-link">3</a></li>
            <li className="page-item"><a href="#" className="page-link">4</a></li>
            <li className="page-item"><a href="#" className="page-link">5</a></li>
            <li className="page-item"><a href="#" className="page-link">Next</a></li>
          </ul>
        </section>
        </Table.Footer>
      </Table>
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