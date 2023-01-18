import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import Header from '../components/Navbar/Header';
import Footer from '../components/Navbar/Footer';
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { Link, Route, useHistory } from "react-router-dom";



const PopularItems = () => {

	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();
    var tempPrd = [];
	const [products, setProducts] = useState([]);
    var randNumber = [];
	const [filter, setFilter] = useState(null);
	const [loading, setLoading] = useState(true);
	const [itemAdded, setItemAdded] = useState(false);
    const [highlightProduct, setHihhlightProduct] = useState(0);

	useEffect(() => {

		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
                console.log(response.data)
                const randomNumber = e => {
                    const len = response.data.length;
                    for (var i=1;i<=10; i++){
                        randNumber.push(Math.floor(Math.random() * len));}

                    console.log(randNumber);
                }
                randomNumber();

                for (var j in randNumber){
                    tempPrd.push(response.data[randNumber[j]]);
                    console.log(response.data[randNumber[j]]);

          
                }
                setProducts(tempPrd);


                console.log("this is "+products);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	async function fetchById(id){
		setLoading(true);
		const response = await ProductService.getProductById(id);
		setFilter(response.data);
		setLoading(false);
	};

	function addToCart(id, e) {
		setItemAdded(true);
		fetchById(id);
		if (localStorage.getItem("cart") == null) {
			localStorage.setItem("cart", "[]");
		}
		const items = JSON.parse(localStorage.getItem("cart"));
		
		const data = {
			productId: filter.productId, productName: filter.productName, productDescription: filter.productDescription,
			productImg: filter.productImg, pricePerUnit: filter.pricePerUnit, showProduct: filter.showProduct
		};
		items.push(data);
		localStorage.setItem("cart", JSON.stringify(items));
		setItemAdded(false);
	}

	return (
		<>
			<Header />
			<section className="py-5">
				<div className="container mt-3">
					<div className="row gx-4 gx-lg-5 justify-content-center">
						{!loading && (
							<div className="row">
								{products.map(
									(productItems, index) => (
										<div key={index} className="col-lg-4 col-4 d-flex">
											<div style={{ width: "30rem" }} className="card">

												<Link to={`/viewsingleproduct/${productItems.productId}`}>
													<img className="card-img-top image-fluid" src={productItems.productImg} alt={productItems.productDescription} />
												</Link>

												<div className="card-body p-4">
													<div className="text-center">
														<h5 className="fw-bolder">
															<Link to={`/viewsingleproduct/${productItems.productId}`}>{productItems.productName}</Link>
														</h5>
														<h4 className="mb-1" >${productItems.pricePerUnit}</h4>
														<h6 className="text-success">Free shipping</h6>
														<button onClick={(e) => addToCart(productItems.productId, e)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
													</div>
												</div>
											</div>

										</div>
									))}
							</div>)}
					</div>
				</div>
			</section>
			<Footer />
		</>
	)

};


export default PopularItems;