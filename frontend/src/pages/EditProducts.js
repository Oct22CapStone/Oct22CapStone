import axios from 'axios';
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
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Card from '../components/DisplayCard/Card';
import styled from "styled-components";





function EditProducts() {

 //************************* STATES  //*************************/
  // ADD STATES
  const [showProduct, setShowProduct] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productName, setProductName] = useState('');
  const [productImg, setProductImg] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [productDescription, setProductDescription] = useState('');
  // DELETE STATE
  const [productIdDelete, setProductIdDelete] = useState('');
  // UPDATE STATES
  const [productIdUpdate, setProductIdUpdate] = useState('');
  const [showProductUpdate, setShowProductUpdate] = useState('');
  const [productQtyUpdate, setProductQtyUpdate] = useState('');
  const [productNameUpdate, setProductNameUpdate] = useState('');
  const [productImgUpdate, setProductImgUpdate] = useState('');
  const [pricePerUnitUpdate, setPricePerUnitUpdate] = useState('');
  const [productDescriptionUpdate, setProductDescriptionUpdate] = useState('');
  // VIEW BY ID
  const [productIdView, setProductIdView] = useState('');
  // const [products, setProducts] = useState(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() =>{
  //   const fetchData  = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await ProductService.getProduct();
  //       setProducts(response.data); // now 'products' have all the products'
  //     } catch(error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
    
  // }, []);



//************************* READ IN  *************************/
// ADD READ IN
  const changeShowProduct = (event) => {
    setShowProduct(Boolean(event.target.value) ? 1 : 0); //button trigger returns value here
  };
  const changeProductQty = (event) => {
    setProductQty(parseInt(event.target.value)); //button trigger returns value here
  };
  const changeProductName = (event) => {
    setProductName(event.target.value); //button trigger returns value here
  };
  const changeProductImg = (event) => {
    setProductImg(event.target.value); //button trigger returns value here
  };
  const changePricePerUnit = (event) => {
    setPricePerUnit(parseInt(event.target.value)); //button trigger returns value here
  };
  const changeProductDescription = (event) => {
    setProductDescription(event.target.value); //button trigger returns value here
  };
  // DELETE READ IN
  const changeProductIdDelete = (eventDelete) => {
    setProductIdDelete(parseInt(eventDelete.target.value));
  };
  //console.log("Delete Product ID: ", productIdDelete);
  
  //UPDATE READ IN
  const changeProductIdUpdate = (eventUpdate) => {
    setProductIdUpdate(parseInt(eventUpdate.target.value));
  };
  const changeShowProductUpdate = (eventUpdate) => {
    setShowProductUpdate(Boolean(eventUpdate.target.value) ? 1 : 0); //button trigger returns value here
  };
  const changeProductQtyUpdate = (eventUpdate) => {
    setProductQtyUpdate(parseInt(eventUpdate.target.value)); //button trigger returns value here
  };
  const changeProductNameUpdate = (eventUpdate) => {
    setProductNameUpdate(eventUpdate.target.value); //button trigger returns value here
  };
  const changeProductImgUpdate = (eventUpdate) => {
    setProductImgUpdate(eventUpdate.target.value); //button trigger returns value here
  };
  const changePricePerUnitUpdate = (eventUpdate) => {
    setPricePerUnitUpdate(parseInt(eventUpdate.target.value)); //button trigger returns value here
  };
  const changeProductDescriptionUpdate = (eventUpdate) => {
    setProductDescriptionUpdate(eventUpdate.target.value); //button trigger returns value here
  };
  // console.log("Update Product ID: ", productIdUpdate);

// VIEW BY ID READ IN
const changeProductIdView = (eventView) => {
  setProductIdView(parseInt(eventView.target.value));
};
//console.log("View by Id: ", productIdView);

//************************* SEND VALUES TO AXIOS  *************************/
// ADD SEND VALUES
  const handleAddProduct = (event) => {
    event.preventDefault();
    const addProductValue = {
      showProduct,
      productQty,
      productName,
      productImg,
      pricePerUnit,
      productDescription,
    };
    //testing
    console.log("Add product info sent: ", addProductValue);
    ProductService.createProduct(addProductValue);
    //axios.post("http://localhost:8181/product/save_product", addProductValue);
    clearEntryAddProduct();
  }
// DELETE SEND VALUES
const handleDeleteProduct = (eventDelete) => {
  eventDelete.preventDefault();
  const deleteUrl = "http://localhost:8181/product/delete/".concat(productIdDelete);
  //testing
  console.log("Delete info sent: ", deleteUrl, productIdDelete);
  axios.delete(deleteUrl, parseInt(productIdDelete));
  clearEntryDeleteProduct();
}
// UPDATE SEND VALUES *********************************************
const handleUpdateProduct = (eventUpdate) => {
  eventUpdate.preventDefault();
  const showProductUpdateBoolean = Boolean(showProductUpdate);
  const productQtyUpdateInt = parseInt(productQtyUpdate);
  const pricePerUnitUpdateInt = parseInt(pricePerUnitUpdate);
  //const productIdUpdateLong = parseLong(productIdUpdate);
  const updateProductValue = {
    //productIdUpdateLong, // added
    showProductUpdateBoolean,
    productQtyUpdateInt,
    productNameUpdate,
    productImgUpdate,
    pricePerUnitUpdateInt,
    productDescriptionUpdate,
  };
  const updateUrl = "http://localhost:8181/product/update/".concat(productIdUpdate);
  //testing
  console.log("update info sent: ", updateUrl, updateProductValue, productIdUpdate);
  axios.put(updateUrl, parseInt(productIdUpdate), updateProductValue);
  clearEntryUpdateProduct();
}

// VIEW BY ID SEND VALUE
const handleViewProduct = (eventView) => {
  eventView.preventDefault();

  const productViewUrl = "http://localhost:8181/product/".concat(productIdView);
  ProductService.getProductById(productIdView);
  //testing
  // console.log("get product by id: ", productIdView, productViewUrl);
  // axios.get(productViewUrl, parseInt(productIdView));
  // console.log(axios.get(productViewUrl).then(response => response.data));
  // const viewByIdProduct = axios.get(productViewUrl).then(response => response.data);
  // console.log(viewByIdProduct);

  fetch(productViewUrl) //1
  .then((response) => response.json()) //2
  .then((product) => {
    console.log(product); //3
  });

  clearEntryViewProduct();
} // end of handleViewProduct







  //************************* CLEAR FIELDS  *************************/

  // ADD CLEAR FIELDS
  const clearEntryAddProduct = () => {
    setShowProduct('');
    setProductQty('');
    setProductName('');
    setProductImg('');
    setPricePerUnit('');
    setProductDescription('');
  };
  // DELETE CLEAR FIELD
  const clearEntryDeleteProduct = () => {
    setProductIdDelete('');
  };
  // UPDATE CLEAR FIELDS
  const clearEntryUpdateProduct = () =>{
    //setProductIdUpdate('');
    setShowProductUpdate('');
    setProductQtyUpdate('');
    setProductNameUpdate('');
    setProductImgUpdate('');
    setPricePerUnitUpdate('');
    setProductDescriptionUpdate('');
  };
  // VIEW ID CLEAR FIELDS
  const clearEntryViewProduct = () => {
    setProductIdView('');
  };


  // display
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
        <MDBRow>

          {/* Add Product */}
            <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Product</p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Product Name' value={productName} id="productName" onChange={changeProductName} type='text' />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Quantity' value={productQty} id="productQty" onChange={changeProductQty} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Product Image' value={productImg} id="productImg" onChange={changeProductImg} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Price Per Unit' value={pricePerUnit} id="pricePerUnit" onChange={changePricePerUnit}  type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Description' value={productDescription} id="productDescription" onChange={changeProductDescription} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Show Product Boolean' value={Boolean(showProduct)} id="showProduct" onChange={changeShowProduct}  type='text' />
              </div>
              <MDBBtn className='mb-4' size='lg' onClick={handleAddProduct}>Add Product</MDBBtn>
            </MDBCol>


            {/* Update Product *******************************/}
            <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Product</p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Product ID' value={productIdUpdate} id="productIdUpdate" onChange={changeProductIdUpdate} type='text' />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Product Name' value={productNameUpdate} id="productNameUpdate" onChange={changeProductNameUpdate} type='text' />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Quantity' value={productQtyUpdate} id="productQtyUpdate" onChange={changeProductQtyUpdate} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Product Image' value={productImgUpdate} id="productImgUpdate" onChange={changeProductImgUpdate} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Price Per Unit' value={pricePerUnitUpdate} id="pricePerUnitUpdate" onChange={changePricePerUnitUpdate}  type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Description' value={productDescriptionUpdate} id="productDescriptionUpdate" onChange={changeProductDescriptionUpdate} type='text'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Show Product Boolean' value={Boolean(showProductUpdate)} id="showProductUpdate" onChange={changeShowProductUpdate}  type='text' />
              </div>
              <MDBBtn className='mb-4' size='lg' onClick={handleUpdateProduct}>Update Product</MDBBtn>
            </MDBCol>
             

             {/* Delete Product */}
             <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Delete Product</p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput label='Product ID' value={productIdDelete} id="productIdDelete" onChange={changeProductIdDelete} type='text' />
              </div>
              <MDBBtn className='mb-4' size='lg' onClick={handleDeleteProduct}>Delete Product</MDBBtn>
            </MDBCol> 
          </MDBRow>
        </MDBCardBody>

        <MDBCardBody>
          
          <MDBRow>
                {/* View Product *******************************/}
              {/* <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">View Product</p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBInput label='Product ID' value={productIdView} id="productIdView" onChange={changeProductIdView} type='text' />
                </div>
                <MDBBtn className='mb-4' size='lg' onClick={handleViewProduct}>View Product</MDBBtn>
              </MDBCol>  */}

                {/* View All Products *******************************/} 
              {/* <MDBCol md='10' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">View All Products</p>
                <MDBBtn className='mb-4' size='lg' onClick={handleViewProduct}>View All</MDBBtn>
              </MDBCol>  */}
          </MDBRow>

      </MDBCardBody>

    </MDBCard>

      
    </MDBContainer>

  );
}

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

export default EditProducts;