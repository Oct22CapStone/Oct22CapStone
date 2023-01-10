import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import Card from "../components/DisplayCard/Card";
import { Link } from "react-router-dom";



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
				console.log(products);
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
					<h2>Welcome back, {userInfo?.name}</h2>
					{!loading && (
				<article>
					<Container>
						<section>
							<h2>ADMIN PANEL</h2>
							<p><Link to="/user/read">View Users</Link></p>
						</section>
					</Container>
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