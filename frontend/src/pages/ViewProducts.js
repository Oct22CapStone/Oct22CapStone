import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Card from "../components/DisplayCard/Card";



const ViewProducts = () => {
	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();

	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);

    // Fetch all data and put into 'products'
	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
				setProducts(response.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
		
	}, []);


	return (
		
		<Container>
	
			
			{authState?.isAuthenticated ? (
				<>
					<h1>Welcome Admin, {userInfo?.name}</h1>

                    
					{/* Search functionality - for later on
                    <input type="text" placeholder="Search..." className="search"/> 
                    */}
                
                
                <h2>All Products</h2>	
					{!loading && (		
				<article>             
                    {
                        
                        <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Price Per Unit</th>
                            <th>Product Description</th>
                            <th>Show</th>
                            <th> {products.productImg}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map( ({productId, productQty, showProduct, productName, productImg, pricePerUnit, productDescription}) => {
                                return (
                                    <tr key={productId}>
                                    <td> { productId } </td>
                                    <td> { productQty } </td>
                                    <td> { productName } </td>
                                    <td> { pricePerUnit } </td>
                                    <td> { productDescription } </td>
                                    <td> { showProduct } </td>
                                    <td> { productImg } </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody> 
                    </table>
                    }
				</article>)}
				</>
			) : ( //when not signed in:
<>
				{!loading  && (  
				<article> 
                    
					<h1>Please login as Admin</h1>
					{/* {products.map(
						({id, productQty, productName, showProduct, productImg, pricePerUnit,productDescription}) => (
						<div key={id} className="card">
								
								<Card
									
									productImg={productImg}
									productQty={productQty}
									productName={productName}
									pricePerUnit={pricePerUnit}
									productDescription={productDescription}
									showProduct={showProduct}
								/>
						</div>
						)
					)}; */}
				</article>	)}</>
	
			)}
		</Container>
	);
};

const Container = styled.section`
	max-width: 90%;
	margin: 2rem auto;

	& h1 {
		display: flex;
		align-items: right;
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.7rem;
		background: #e6ffee;
		padding: 20px 80px;
	}

	& h2 {
		display: flex;
		align-items: right;
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.0rem;
		background: #e6ffee;
		padding: 20px 80px;
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

export default ViewProducts;