import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { useParams } from "react-router-dom";
import Home from "./Home";

const ViewSingleProduct = () => {
    
    const item = [];
    const cart = [];
    const {id} = useParams();        
    const [product, setProduct] = useState("");
    const [quantity,setQuantity]= useState(null);
    const productIdStore = [];
    const productId = [];
    const newArray = [];
    
    const addToCart = () => {
        // if cart is empty, set it to empty array
        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
            localStorage.setItem("productIds", "[]");
        }
        // set items to old values of cart and productIds
        const items = JSON.parse(localStorage.getItem("cart"));
        const productIds = JSON.parse(localStorage.getItem("productIds"));

        // create data for what the user for selected
        const data = { productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productQty: product.productQty, productImg: product.productImg, pricePerUnit: product.pricePerUnit
        };
        console.log(typeof items);
        console.log("***", typeof newArray);

        // if productId is already in array, remove the product. Set 'items' to new array
        if(productIds.includes(product.productId)){
            // create new array without the product
            newArray.push(items.filter(function (item) {
                return item.productId !== product.productId;
            }));
            items.length = 0;
            items.push(newArray);
        }
        //newArray.splice(items(0));
        // console.log("items: ", items);
        // console.log("newArray: ", newArray);
        
        // add old values of cart in "items" with new data selected by user
        items.push(data);

        // add id into productIds if it is not already included
        if (!productIds.includes(product.productId)){
            productIds.push(product.productId);
        }
        console.log("product Id's: ", productIds);
        
        // set cart to string of items
        localStorage.setItem("cart", JSON.stringify(items));
        localStorage.setItem("productIds", JSON.stringify(productIds));
        
    }


    const changeQuantity=(event)=>{
        setQuantity(quantity =>({...quantity, [event.target.name]: event.target.value}));
        //console.log(quantity);
    }
    useEffect(() =>{    
        const fetchData  = async () => {
            try {
                const response = await ProductService.getProductById(id);                                           
                setProduct(response.data);
            } catch(error) {
                console.log(error);
            }
        }; 
        if(id && id !=="")
        fetchData();
    },[id]);
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
                            <button onClick={addToCart} className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>
                            <br></br>
                            <label>Quantity:</label>
                            <input defaultValue={1} onChange={changeQuantity} name="qty" type="number"></input>
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