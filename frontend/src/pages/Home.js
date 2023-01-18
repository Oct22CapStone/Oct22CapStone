import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import Header from '../components/Navbar/Header';
import Footer from '../components/Navbar/Footer';
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { Link, Route, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";



const Home = () => {

	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState(null);
	const [loading, setLoading] = useState(true);
	const [itemAdded, setItemAdded] = useState(false);
	const [num, setNum] = useState();
	let response = 0;
	// load all page data
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

    const [product, setProduct] = useState("");

    const addToCart = () => {
		console.log("product inside of cart is: ", product);
        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
			console.log("creating new cart");
        }
        const items = JSON.parse(localStorage.getItem("cart"));
		console.log("initial items: ", items);
        const data = {productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct};
		console.log("data is: ", data);
        items.push(data);
		console.log("items after data push: ", items);
        localStorage.setItem("cart", JSON.stringify(items));
        //update navbar cart total
        window.parent.updateCartTotal();
        
    } 

	function setId(productId){
		setNum(productId);
	};

    
    useEffect(() => {
		console.log("inside useEffect");
		
		var str = "http://localhost:8181/product/"+num;
		console.log("str type: ", typeof str);
		console.log("str: ", str);
		fetch(`http://localhost:8181/product/${num}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			})

		// fetch data into a single product
        if (num && num != 0){
			
			addToCart();
		}
	//console.log("product is: ", product);
	
            
    }, [num]);

	

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
														<button onClick={(e) => setId(productItems.productId)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
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


export default Home;