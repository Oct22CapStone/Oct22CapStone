import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { useParams } from "react-router-dom";

const ViewSingleProduct = () => {

    const { id } = useParams();
    const [product, setProduct] = useState("");
    
    const addToCart = () => {
        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
        }
        const items = JSON.parse(localStorage.getItem("cart"));
        const data = {productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct};
        items.push(data);
        localStorage.setItem("cart", JSON.stringify(items));
        
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductService.getProductById(id);
                setProduct(response.data);   
                console.log(response.data);             
            } catch (error) {
                console.log(error);
            }
        };

        if (id && id !== "")
            fetchData();
    }, [id]);


    return (
        <>

        <section class="py-5">
            <div key={product.productId} class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src={product.productImg} alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">PID: {product.productId}</div>
                        <h1 class="display-5 fw-bolder">{product.productName}</h1>
                        <div class="fs-5 mb-5">
                            
                            <span>${product.pricePerUnit} </span>
                    </div>
                    <div>
                        <p class="lead">{product.productDescription}</p> 
                    </div>                          
                    <div class="d-flex">
                        <button onClick={addToCart} class="btn btn-outline-dark flex-shrink-0 w-25" type="button"><i class="bi-cart-fill me-1"></i> Add to cart</button> 
                        <br></br>
                        <input class = "form-control text-center w-25" defaultValue={1} onChange={changeQuantity} id = "inputQuantity" type="number"></input>
                    </div>
                </div>
            </div>
        </div>
    </section>


            <div key={product.productId} className="container mt-5 mbclassName-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4">
                                            <img src={product.productImg} className="img-fluid w-100" /> </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-4">
                                        <div className="mt-4 mb-3">
                                            <h5 className="text-uppercase">{product.productName}</h5>
                                            <div className="price d-flex flex-row align-items-center">
                                                <span>${product.pricePerUnit}</span>
                                            </div>
                                        </div>
                                        <p className="about">{product.productDescription}</p>
                                        <div className="cart mt-4 align-items-center">
                                            <button onClick={() => addToCart(product)} className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>
                                            <br></br>
                                            <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};
export default ViewSingleProduct;



