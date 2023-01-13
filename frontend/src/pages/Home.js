import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import Header from '../components/Navbar/Header'; 
import Footer from '../components/Navbar/Footer'; 
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { Link, Route, useHistory } from "react-router-dom";



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
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

		//console.log("inside of products: ", products);
		


	return(
		<>
		<Header/>
		<section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 justify-content-center">
		
	{!loading &&(
		<div>
			
			{products.map(
({productId, productName, productImg, pricePerUnit, productDescription}) =>(
	<div key={productId} className="container py-2">
	    
					
				
                    <div class="col mb-5">
                        <div class="card h-100">
						
                            <img class="card-img-top" src= {productImg} alt="..." /> 
                

							<div class="card-body p-4">
                                <div class="text-center">
									<h5 class = "fw-bolder">
										<Link to={`/viewsingleproduct/${productId}`}>{productName}</Link>
									</h5>
									<h4 class = "mb-1" >${pricePerUnit}</h4>
									<h6 className="text-success">Free shipping</h6>
									<button class="btn btn-outline-dark mt-auto" type="button"><i class="bi-cart-fill me-1"></i> Add to cart</button>
								</div>

							</div>

						</div>
					</div>

					
					
				

	</div>

	
	))};

	

	</div>)}

	

	</div>
	</div>
	</section>

	<Footer/>

	</>
	)

};


export default Home;