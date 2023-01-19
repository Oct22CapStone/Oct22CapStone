import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import Nav from "../components/Navbar/PageWrapper";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

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
import UserService from "../services/UserService";
import AddressService from "../services/AddressService";
import useAuthUser from "../hook/getUser";

let stripePromise;
let lineItems = [];


const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51MRo02LTsOAchG7BnVUUeC0aspLHGIxkEhR44jO5EKy1m7cgVhKeiPrudWZTQNoYn47dmfXgEhQwfbwuYPEx644i00S2Fn0ocZ');
  }
  return stripePromise;
};

const redirectToCheckout = async () => {
  // setLoading(true);
  const stripe = await getStripe();
  // setLoading(false);
  const { error } = await stripe.redirectToCheckout({
    lineItems,
    mode: 'payment',
    successUrl: `http://localhost:3000/orderdetails`,
    cancelUrl: `http://localhost:3000/cart`,
    customerEmail: JSON.parse(localStorage.getItem("userEmail")),
  });
  console.warn(error.message);

};

const Cart = () => {
  const [items, setItems] = useState([]);
  var chosenItems = []; // to calculate total price. Holds id as key, and total as value
  var cartItem = [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState("");
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useAuthUser();
  const [shippingAddress, setShippingAddress] = useState([]);
  var fetchId;
  var trainData = [];



  function addToChosenItems(id, price, quantity) {
    chosenItems.push(price);
  };

  function deleteProduct(id, e) {
    cartItem = JSON.parse(localStorage.getItem('cart')).filter(product => product.productId !== id)
    localStorage.setItem('cart', JSON.stringify(cartItem));
    setItems(items.filter(product => product.productId !== id));
    window.parent.updateCartTotal();
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart')) != null) {
      setItems(JSON.parse(localStorage.getItem('cart')));
      lineItems = items.map(function (item) { return { price: item.priceCode, quantity: 1 } });
      var numTotal = 0;
      for (const id in items) {
        numTotal = numTotal + parseInt((items[id].pricePerUnit));
      }
      setTotalPrice(numTotal);
      localStorage.setItem("totalPriceCart",totalPrice);
    }
    const fetchData = async () => {//GET CURRENT USER AND THEIR ADDRESS
      try {
        setLoading(true);
        const email = JSON.parse(localStorage.getItem("userEmail"));
        const response = await UserService.getUserByEmail(email);
        setUser(response.data);       
        const result = await AddressService.findAllAddresses();
        setAddress(result.data.filter(a => a.userId.userId === response.data.userId));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      
      
    };
    fetchData();
  }, [items.length]);

  function handleChange(event) {
    fetchId = event.target.value;
    const componentDidMount = async () => {
      await AddressService.getAddressById(fetchId).then((response) => {
        setShippingAddress(response.data);
        trainData = shippingAddress;
        console.log(shippingAddress);
        localStorage.setItem("orderAddress",JSON.stringify(shippingAddress));
      }).catch((error) => {
        console.log(error);
      });
    }
    componentDidMount();

  }
  //MAIL TEMPLATE

  const mailTemplate = {//HOW TO GET THE USER'S ADDRESS HERE?
    recipient: user.email,
    msgBody: `
        User ${user.username}, thank you for your purchase.
        Your order will be delivered to ${trainData.street} ${trainData.city} ${trainData.state} ${trainData.zip} ${trainData.country}
        You can track your order here: {tracking goes here}.
      `,
    subject: "Thank you for your purchase!"
  }

  //EMAILING FUNCTION

  const sendEmail = async (event) => {
    axios({ //connect to backend mailer
      method: "POST",
      url: "http://localhost:8181/email/send",
      data: mailTemplate
    })
  }

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
                ({ productId, productName, pricePerUnit, productImg, productDescription }) => (
                  <MDBCardBody key={productId}>
                    <MDBRow>
                      <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                        <MDBRipple rippleTag="div" rippleColor="light"
                          className="bg-image rounded hover-zoom hover-overlay">
                          <img src={productImg} className="w-100" />
                        </MDBRipple>
                      </MDBCol>
                      <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                        <p>
                          <strong>{productName}</strong>
                        </p>
                        <p>{productDescription}</p>
                      </MDBCol>
                      <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                        <div className="text-start text-md-center">
                          <strong>${pricePerUnit}</strong>
                          <p>{addToChosenItems(productId, pricePerUnit, "1")}</p>
                        </div>
                        <div className="text-center">
                          <button onClick={(e) => deleteProduct(productId, e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                        </div>
                      </MDBCol>
                      <MDBCol>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                )
              )}
              <MDBBtn href="/" block size="lg">
                Continue Shopping
              </MDBBtn>
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
                <div className="mb-3 form-group">
                  <label>
                    Address
                    <br></br>
                    <select name='addressId' onChange={handleChange}>
                      {address.map((data) => { return (<option value={data.addressId} key={data.addressId}>{data.street} {data.city} {data.state} {data.zip} {data.country}</option>) })}
                    </select>
                  </label>
                </div>
              </MDBCardBody>
              <MDBCardBody>
                <MDBListGroup>
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
                      <strong>${totalPrice}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn block size="lg" onClick={redirectToCheckout}>
                  CHECKOUT
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
            <MDBCard className="mb-4 mb-lg-0 text-center">
              <MDBCardBody>
                <p>
                  <strong>We accept</strong>
                </p>
                <MDBCardImage className="me-2 mb-4" width="65px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                <MDBCardImage className="me-2 mb-4" width="65px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <MDBCardImage className="me-2 mb-4" width="65px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                <MDBCardImage className="me-2 mb-4" width="65px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark" />
                <p>
                  <strong>Powered By</strong>
                </p>
                <MDBCardImage className="me-2" width="150"
                  src="https://woocommerce.com/wp-content/uploads/2011/12/stripe-logo-blue.png"
                  alt="Stripe" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
};

export default Cart;