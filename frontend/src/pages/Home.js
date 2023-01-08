import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";

import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
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
	<>{!loading &&(
		<div>
			{products.map(
({productId, productName, productImg, pricePerUnit, productDescription}) =>(
	<div key={productId} className="container py-2">			
	    <div className="row justify-content-center mb-3">
      <div className="col-md-12 col-xl-10">
        <div className="card shadow-0className border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
					<img src={productImg} className="img-fluid img-thumbnail w-100" />
                  <a href="#!">
				  
                    <div className="hover-overlay">
                      <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>
					<Link to={`/viewsingleproduct/${productId}`}>{productName}</Link>													
				</h5>
                <p className="text-truncate mb-4 mb-md-0">
					{productDescription}
                </p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1">${pricePerUnit}</h4>                  
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="d-flex flex-column mt-4">
					<Link className="btn btn-primary btn-sm" to={`/viewsingleproduct/${productId}`}>Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>	
	</div>))};
	</div>)}
	</>
	)
};


export default Home;