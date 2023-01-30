import Header from '../components/Navbar/Header';
import Footer from '../components/Navbar/Footer';
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { Link, Route, useHistory } from "react-router-dom";
import UserRoleService from "../services/UserRoleService";


const PopularItems = () => { 
    let tempPrd = [];
	let prdDisplay = [];
	const [products, setProducts] = useState([]);
    let randNumber = [];
	const [filter, setFilter] = useState(null);
	const [loading, setLoading] = useState(true);
	const [setItemAdded] = useState(false);
    const history = useHistory();


    useEffect(() => {

        const fetchRole = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 2) {
                history.push("/");
            }
      }

        const fetchData = async () => {
            setLoading(true);

            try { // add all products where showProduct is true
                const response = await ProductService.getProduct();
                for (var i in response.data){
                    if ((response.data[i].showProduct == true)){
                        prdDisplay.push(response.data[i]);
                    }
                }
                // generate 10 random numbers
                const randomNumber = e => {
                    const len = prdDisplay.length;
                    for (let i=1;i<=10; i++){
                        randNumber.push(Math.floor(Math.random() * len));}
                }
                randomNumber();
 
                for (let j in randNumber){

                    tempPrd.push(prdDisplay[randNumber[j]]);
          
                } // Add these 10 products into "products" via setProducts
                setProducts(tempPrd);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
    fetchRole();
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
									(productItems) => (
										<div key={productItems.productId} className="col-lg-4 col-4 d-flex">
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
