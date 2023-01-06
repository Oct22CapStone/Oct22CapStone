import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Navbar/Header";
import Footer from "../components/Navbar/Footer"; 
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

			<Header />
			
			{authState?.isAuthenticated ? (
				<>
					<h2>Welcome back, {userInfo?.name}</h2>
					<input type="text" placeholder="Search..." className="search"/>

					{!loading && (
						
				<article>
					
					{products.map(
						({productId, productQty, productName, productImg, price_per_unit, productDescription}) => (
						<div key={productId} className="card">

								<Card
									productImg={productImg}
									productName={productName}
									price_per_unit={price_per_unit}
									productDescription={productDescription}
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
						({id, productQty, productName, productImg, price_per_unit,productDescription}) => (
							
						<div key={id} className="card">
			
								<Card
									productImg={productImg}
									productName={productName}
									price_per_unit={price_per_unit}
									productDescription={productDescription}
								/>
						
						</div>
						)
					)};

					
				</article>	)}</>
	
			)}

			<Footer />
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

export default Home;