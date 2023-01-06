import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Card from "../components/DisplayCard/Card";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } 
  from 'mdb-react-ui-kit';


const ViewSingleProduct = () => {
	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();
    const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

    // product ID
    const [productIdView, setProductIdView] = useState('');

    // on click event, assign number to 'productIdView'
    const changeProductIdView = (eventView) => {
        setProductIdView(parseInt(eventView.target.value));
      };

    // handle
    const handleViewProduct = (eventView) => {
    eventView.preventDefault();
    
    const productViewUrl = "http://localhost:8181/product/".concat(productIdView);
    //ProductService.getProductById(productIdView);

    axios.get(productViewUrl, parseInt(productIdView));
    console.log("Id sent to axios: ", productIdView);
    console.log("Product: ", product); // should be null
    console.log("URL being sent: ", productViewUrl);

    function axiosTest(url) {
        return axios.get(url).then(response => response.data)
    }

    var prod = 0;
    
    //setProduct(axiosTest(productViewUrl));
    prod = axiosTest(productViewUrl);
    console.log("Prod: ", prod); // checking prod


    // fetch(productViewUrl) //1
    // .then((response) => response.json()) //2
    // .then((product) => {
    //     //setProduct(product); // ADDED **************
    //     console.log("Inside of fetch, line 36: ", product); //3
    // });

    // var productTest;
    // fetch(productViewUrl)
    //     .then(res => res.json())
    //     .then(data => {
    //         productTest = data;
    //     })
    //     .then( () => {
    //         console.log(productTest)
    //     });
    // console.log("OUTSIDE of fetch: ", product);
    // console.log("PRODUCT TEST: ", productTest);

    clearEntryViewProduct();
    } // end of handleViewProduct

    // VIEW ID CLEAR FIELDS
  const clearEntryViewProduct = () => {
    setProductIdView('');
  };

    // Fetch all data and put into 'products'
	// useEffect(() =>{
	// 	const fetchData  = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const response = await ProductService.getProductById(productIdView);
	// 			setProduct(response.data);
	// 		} catch(error) {
	// 			console.log(error);
	// 		}
	// 		setLoading(false);
	// 	};
	// 	fetchData();
		
	// }, []);


	return (

		
		<Container>
	
			
			{authState?.isAuthenticated ? (
				<>
					<h1>Welcome Admin, {userInfo?.name}</h1>

                    
					{/* Search functionality - for later on
                    <input type="text" placeholder="Search..." className="search"/> 
                    */}
                
                
                <h2>Single Product</h2>	
                {/* View Product *******************************/}
              <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">View Product</p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBInput label='Product ID' value={productIdView} id="productIdView" onChange={changeProductIdView} type='text' />
                </div>
                <MDBBtn className='mb-4' size='lg' onClick={handleViewProduct}>View Product</MDBBtn>
              </MDBCol> 

              
					{!loading && (		
				<article>             
                    {
                        
                        <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Price Per Unit</th>
                            <th>Product Description</th>
                            <th>Show</th>
                            <th> Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map( ({productId, productQty, showProduct, productName, productImg, pricePerUnit, productDescription}) => {
                                return (
                                    <tr key={productId}>
                                    <td> { productId } </td>
                                    <td> { productQty } </td>
                                    <td> { productName } </td>
                                    <td> { pricePerUnit } </td>
                                    <td> { productDescription } </td>
                                    <td> { showProduct } </td>
                                    <td> { productImg } </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody> 
                    </table>
                    }
				</article>
                
                )}
				</>
			) : ( //when not signed in:
<>
				{!loading  && (  
				<article> 
                    
					<h1>Please login as Admin</h1>
					{/* {products.map(
						({id, productQty, productName, showProduct, productImg, pricePerUnit,productDescription}) => (
						<div key={id} className="card">
								
								<Card
									
									productImg={productImg}
									productQty={productQty}
									productName={productName}
									pricePerUnit={pricePerUnit}
									productDescription={productDescription}
									showProduct={showProduct}
								/>
						</div>
						)
					)}; */}
				</article>	)}</>
	
			)}
		</Container>
	);
};

const Container = styled.section`
	max-width: 90%;
	margin: 2rem auto;

	& h1 {
		display: flex;
		align-items: right;
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.7rem;
		background: #e6ffee;
		padding: 20px 80px;
	}

	& h2 {
		display: flex;
		align-items: right;
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.0rem;
		background: #e6ffee;
		padding: 20px 80px;
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

export default ViewSingleProduct;