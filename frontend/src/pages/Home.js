import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";

import styled from "styled-components";
import axios from "axios";
import Header from "../components/Navbar/Header";
import Footer from "../components/Navbar/Footer"; 
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, Route, useHistory } from "react-router-dom";
import SessionCode from "../services/SessionCode";


const Home = () => {
	async function ViewProduct(id){
		const productId=await ProductService.getById(id);
		const navigate=useHistory();
		console.log(productId);
		navigate.push({
			pathname:"/SessionCode",
			state:{detail:productId.data}
		})
	}
	
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


	return(
	<>{!loading &&(
		<div>
			{products.map(
({productId, productQty, productName, productImg, price_per_unit, productDescription}) =>(
	<div key={productId}>		
	<table>
	<tr>
	<th>Product Name</th>
	<th>Price</th>
	<th>Description</th>
	</tr>
	<tr>
	<td>{productName}</td>
	<td>{price_per_unit}</td>
	<td>{productDescription}</td>
	<button onClick={()=>ViewProduct(productId)}> Buy</button>
	</tr>
	
	</table></div>))};
	</div>)}
	</>
	)};


export default Home;