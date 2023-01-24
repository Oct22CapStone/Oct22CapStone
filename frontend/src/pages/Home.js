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
	var tempPrd = [];
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState(null);
	const [loading, setLoading] = useState(true);
	const [itemAdded, setItemAdded] = useState(false);
	const [num, setNum] = useState(0);
	const [product, setProduct] = useState("");
	//let isDupe = 1;
	// load all page data
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();

				for (var i in response.data){

					if ((response.data[i].showProduct == true)){
					tempPrd.push(response.data[i]);
					}
				}
				setProducts(tempPrd);

			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	function containsObject(list, obj) {
		if (list != null){
			var i = 0;
			while(i < (list.length)){
				if( JSON.stringify(list[i]) == JSON.stringify(obj) ){
					return true;
				}
				i++;
			}
		}
		return false; 
	}
	function localObj(){
		const data = {productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct, priceCode:product.priceCode};
		return data;
	}



    const addToCart = () => {
        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
        }
        const items = JSON.parse(localStorage.getItem("cart"));
        const data = localObj();
		// if data is new, add it and display success message
		if(!containsObject(items, data)){
			items.push(data);
			localStorage.setItem("cart", JSON.stringify(items));
			//update navbar cart total
			window.parent.updateCartTotal();
			alert(product.productName + " added successfully!");
		}
		else{
			alert(product.productName +"Item already in cart");
		}
        
    } 

	function setId(productId){
		setNum(productId);
	};
    
    useEffect(() => {
		fetch(`http://localhost:8181/product/${num}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			});
            
    }, [num]);

	useEffect(() =>{
		if (num && num != 0){
			addToCart();
		}
	}, [product])

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