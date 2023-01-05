import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Card from "../components/DisplayCard/Card";



const Home = () => {
	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();

	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
				setProducts(response.data);
				//console.log(response.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
		
	}, []);

		//console.log("inside of products: ", products);

	return (
		
		<Container>
			<h1>Welcome To Our Shop!</h1>
			
			{authState?.isAuthenticated ? (
				<>
					<h2>Welcome back, {userInfo?.name}</h2>

					<input type="text" placeholder="Search..." className="search"/>

					{!loading && (
						
				<article>

				


					{products.map(
						({productId, productQty, showProduct, productName, productImg, pricePerUnit, productDescription}) => (
						<div key={productId} className="card">

								<Card
									productImg={productImg}
									productQty={productQty}
									productName={productName}
									pricePerUnit={pricePerUnit}
									productDescription={productDescription}
									showProduct={showProduct}
									productId={productId}
								/>

						</div>
						)
					)}

					
				</article>)}
				</>
			) : (
<>
				{!loading  && (
				<article>
					
					{products.map(
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
					)};

					
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

export default Home;