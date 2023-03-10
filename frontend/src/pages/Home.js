import Header from '../components/Navbar/Header';
import Footer from '../components/Navbar/Footer';
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";

import UserService from "../services/UserService";
import { Link, Route, useHistory } from "react-router-dom";
import UserRoleService from "../services/UserRoleService";


const Home = () => {

	let tempPrd = [];
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [users, setUsers] = useState("");

	const [isAdmin, setIsAdmin] = useState(false);

	const [filterdata, setFilterData] = useState([]);//FOR THE SEARCH
	const [query, setQuery] = useState('');//FOR THE SEARCH

	const [num, setNum] = useState(0);
	const [product, setProduct] = useState("");

	const [canAdd, setCanAdd] = useState(0);

	// load all page data

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);//load page
				//assign role if not logged in
				if (localStorage.getItem("userEmail") == null ) {
					setIsAdmin(false);
				}
				else {//if logged in...
                const email = JSON.parse(localStorage.getItem("userEmail"));
                const emailRes = await UserService.getUserByEmail(email);
                setUsers(emailRes.data);
                const roleRes = await UserRoleService.findAllUserRole();
                let roles = roleRes.data.filter(a => { return a.user.userId === emailRes.data.userId }).
                    map(function (r) { return r.role.roleId });
					console.log(roles + " roles");

                	if (roles == 1) {
                    	setIsAdmin(true);
                	} else {
                    	setIsAdmin(false);
                	}
				}//end

				//load products
				const response = await ProductService.getProduct();
				for (var i in response.data) {

					if ((response.data[i].showProduct == true)) {
						tempPrd.push(response.data[i]);

					}
				}
				setProducts(tempPrd);
				setFilterData(tempPrd); //FOR THE SEARCH


			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		//fetchData();

		//SET A TIMEOUT FOR PROPER LOADING OF USER'S DATA
		setTimeout(() => fetchData(), 300);//KENZIE
		const timer = setTimeout(() => console.log('Initial timeout!'), 300);//KENZIE
		clearTimeout(timer);//KENZIE
	}, []);

	function containsObject(list, obj) {

		if (list != null){
			let i = 0;
			while(i < (list.length)){
				if( JSON.stringify(list[i]) == JSON.stringify(obj) ){
					return true;
				}
				i++;
			}
		}
		return false;
	}
	function localObj() {
		const data = {
			productId: product.productId, productName: product.productName, productDescription: product.productDescription,
			productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct, priceCode: product.priceCode
		};
		return data;
	}



	const addToCart = () => {
		if (localStorage.getItem("cart") == null) {
			localStorage.setItem("cart", "[]");
		}
		const items = JSON.parse(localStorage.getItem("cart"));
		const data = localObj();
		// if data is new, add it and display success message
		if (!containsObject(items, data)) {
			items.push(data);
			localStorage.setItem("cart", JSON.stringify(items));
			//update navbar cart total
			window.parent.updateCartTotal();
			setCanAdd(1);
		}
		else {
			setCanAdd(2);
		}

	}

	function setId(productId) {
		setNum(productId);
		setCanAdd(0);
	};

	useEffect(() => {
		fetch(`https://backendecommerce.azurewebsites.net/product/${num}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			});

	}, [num]);

	useEffect(() => {
		if (num && num != 0) {
			addToCart();
		}
	}, [product])

	//FUNCTION TO SEARCH BY PRODUCT NAME
	const handlesearch = (event) => {
		const getSearch = event.target.value;
		if (getSearch.length > 0) {
			const searchdata = products.filter((item) => item.productName.toLowerCase().includes(getSearch.toLowerCase()));
			setProducts(searchdata);
		} else {
			setProducts(filterdata);
		}
		setQuery(getSearch);
	}

	return (
		<>
			<Header />
			<section className="py-5">

				<div className="container mt-3">

					<div className="row gx-4 gx-lg-5 justify-content-center">

						{!loading && (
							<div className="row">
								{/* SEARCH BAR */}
								<span>
									<div className="container mb-4 text-end">
										<input type="text" name='productName' value={query} placeholder="Search by product name .." onChange={(e) => handlesearch(e)}></input>
									</div>
								</span>
								{/* END SEARCH BAR */}
								{products.map(
									(productItems) => (
										<div key={productItems.productId} className="col-lg-4 col-4 d-flex">
											<div style={{ width: "30rem" }} className="card">

												<Link to={`/viewsingleproduct/${productItems.productId}`}>
													<img className="card-img-top img-fluid" src={productItems.productImg} alt={productItems.productDescription} />
												</Link>


												<div className="card-body p-4">
													<div className="text-center">
														<h5 className="fw-bolder">
															<Link to={`/viewsingleproduct/${productItems.productId}`}>{productItems.productName}</Link>
														</h5>
														<h4 className="mb-1" >${productItems.pricePerUnit}</h4>
														<h6 className="text-success">Free shipping</h6>

														{
															!isAdmin ? (
															<div>
																<button onClick={(e) => setId(productItems.productId)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
																{(num == productItems.productId) && (canAdd == 1) && <div className="alert alert-success" role="alert">Added Successfully</div>}
																{(num == productItems.productId) && (canAdd == 2) && <div className="alert alert-danger" role="alert">Item Already in Cart</div>}
															</div>
															) : (
																<div >
																</div>
																)
														}

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
