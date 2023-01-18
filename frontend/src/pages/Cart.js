import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
  } from "mdb-react-ui-kit";


const Cart = () => {
  const [items,setItems] = useState([]);
  var cartItem = [];
  const [users, setUsers] = useState("");
  const [email, setEmail] = useState("")

  const fetchData = async () => {
    try {
      const email = JSON.parse(localStorage.getItem("userEmail"));           
      const response = await UserService.getUserByEmail(email);
      setUsers(response.data);
    } catch(error) {
      console.log(error);
    }
  }
  fetchData();

  const mailerInfo = {//MAILER STUFF - KENZIE
    recipient: email,
    msgBody: `Please review your order details below.`,
    subject: "Thank you for your purchase!"
  }

  const mailer = () => {
    axios({
      method: "POST",
      url:"http://localhost:8181/email/send",
      data:  mailerInfo
    })
  }
 
  function deleteProduct  (id,e){
    cartItem = JSON.parse(localStorage.getItem('cart')).filter(product => product.productId !== id)
    localStorage.setItem('cart', JSON.stringify(cartItem));
    setItems(items.filter(product => product.productId !== id));
    console.log(items);
  };

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('cart')) != null){
      setItems(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);



  return (

  <section className="h-100 h-custom" style={{ backgroundColor: "#fdddc3" }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center my-4">
        <MDBCol md="8">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
            <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                      Cart
                    </MDBTypography>
            </MDBCardHeader>
            {items.map(
          ({productId, productName, pricePerUnit, productImg, productDescription}) => (
            <MDBCardBody key={productId}>
              <MDBRow>
                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                <MDBRipple rippleTag="div" rippleColor="light"
                  className="bg-image rounded hover-zoom hover-overlay"> 
                  <img src={productImg} className = "w-100" />
                  
                  </MDBRipple>
                </MDBCol>

                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                  <p>
                    <strong>{productName}</strong>
                  </p>
                  <p>{productDescription}</p>
                
              </MDBCol>

              <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                  <MDBBtn className="px-3 me-2">
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>

                  <MDBInput defaultValue={1} min={0} type="number" label="Quantity" />

                  <MDBBtn className="px-3 ms-2">
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </div>

                <p className="text-start text-md-center">
                  <strong>${pricePerUnit}</strong>
                </p>

                <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>

                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          )
          )}
          </MDBCard>      
        </MDBCol>
      <MDBCol md="4">
        <MDBCard className="mb-4">
          <MDBCardHeader>
            <MDBTypography tag="h5" className="mb-0">
              Order Summary
            </MDBTypography>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>PRODUCTS + PRICE HERE</span>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>$0.00 (Free Shipping)</span>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Order Total</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>TOTAL PRICE HERE</strong>
                </span>
              </MDBListGroupItem>
            </MDBListGroup>

            <MDBBtn block size="lg">
            <button onClick={mailer} className="btn btn-primary btn-sm" type='submit' redirect="/">CHECKOUT</button>
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <p>
              <strong>Expected shipping delivery</strong>
            </p>
            <p className="mb-0">Will be updated after checkout</p>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className="mb-4 mb-lg-0">
          <MDBCardBody>
            <p>
              <strong>We accept</strong>
            </p>
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
              alt="PayPal acceptance mark" />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>

    
  )
};

export default Cart;