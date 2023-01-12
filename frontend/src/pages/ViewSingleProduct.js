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
            } catch (error) {
                console.log(error);
            }
        };

        if (id && id !== "")
            fetchData();
    }, [id]);


    return (
        <>
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