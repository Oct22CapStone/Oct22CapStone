import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";

const Cart = () => {
  const [price, setPrice] = useState(0);
  const [product,setProduct] = useState("");
  const [items,setItems] = useState([]);
 
  function deleteProduct  (id,e){
		console.log(id);
		//similar to delete function in viewProducts.js make sure to remove it from items variable AND local storage
   };

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('cart')) != null){
      setItems(JSON.parse(localStorage.getItem('cart')));
      
    }
  }, []);

  return (
    
    <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <p><span className="h2">Shopping Cart </span><span className="h4">( item in your cart)</span></p>

        <div className="card mb-4">
        {items.map(
      ({productId, productName, pricePerUnit, productImg, productDescription}) =>(
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
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </div>
              </div>
            </div>
          
          </div>))};
        </div>
        
        <div className="card mb-5">
          <div className="card-body p-4">

            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead fw-normal">$799</span>
              </p>
            </div>

          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-light btn-lg me-2">Continue shopping</button>
          <button type="button" className="btn btn-primary btn-lg">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</section>
  )
};

export default Cart;