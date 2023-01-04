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
import { useState } from 'react';

// Product use states
function AddProduct() {
  const [showProduct, setShowProduct] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productName, setProductName] = useState('');
  const [productImg, setProductImg] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [productDescription, setProductDescription] = useState('');

// change value of states
  const changeShowProduct = (event) => {
    setShowProduct(Boolean(event.target.value) ? 1 : 0); //button trigger returns value here
  };

  console.log("show Product: ", showProduct);

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

  //send values to axios post to create product
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
    axios.post("http://localhost:8181/product/save_product", addProductValue);
    clearEntry();
  }
  
  // clear fields
  const clearEntry = () => {
    setShowProduct('');
    setProductQty('');
    setProductName('');
    setProductImg('');
    setPricePerUnit('');
    setProductDescription('');
  };


  // display
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>

            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add A Product</p>

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

            

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default AddProduct;
