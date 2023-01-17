import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import Nav from "../components/Navbar/PageWrapper";


const Cart = () => {
  const [price, setPrice] = useState(null);
  const [product,setProduct] = useState("");
  const [items,setItems] = useState([]);
  var chosenItems = []; // to calculate total price. Holds id as key, and total as value
  var cartItem = [];
  const[totalPrice, setTotalPrice]  = useState(0);
  const[num, setNum] = useState(0);
  // Populate 'chosenItems' with prices for each product
  function addToChosenItems(id, price, quantity){
    chosenItems.push(price);
  };
  function deleteProduct  (id,e){
        console.log(items);
        cartItem = JSON.parse(localStorage.getItem('cart')).filter(product => product.productId !== id)
    localStorage.setItem('cart', JSON.stringify(cartItem));
    setItems(items.filter(product => product.productId !== id));
    //update navbar cart total
    window.parent.updateCartTotal();
   };
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('cart')) != null){
      setItems(JSON.parse(localStorage.getItem('cart')));
      var numTotal = 0;
      for(const id in items){
        numTotal = numTotal + parseInt((items[id].pricePerUnit));
      }
      setTotalPrice(numTotal);
    }
    }, [items.length]);   
  return (
    <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <p><span className="h2">Shopping Cart </span><span className="h4">( item in your cart)</span></p>
        <div className="card mb-4">
        {items.map(
      ({productId, productName, pricePerUnit, productQty, productImg, productDescription}) =>(
          <div key={productId} className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={productImg}
                  className="img-fluid" alt="Generic placeholder image"/>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Name</p>
                  <p className="lead fw-normal mb-0">{productName}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Description</p>
                   <p>{productDescription}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Quantity</p>
                  <p className="lead fw-normal mb-0">1</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Price</p>
                  <p className="lead fw-normal mb-0">{pricePerUnit}</p>
                  <p>{addToChosenItems(productId, pricePerUnit, "1")}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>))}
        </div>
        <div className="card mb-5">
          <div className="card-body p-4">
            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead fw-normal">${totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-light btn-lg me-2">Continue shopping</button>
          {/* update total when you click on checkout *** Later: Load when page loads and change upon delete*/}
          <button  type="button" className="btn btn-primary btn-lg">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</section>
  )
};
export default Cart;