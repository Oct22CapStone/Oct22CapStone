import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { useParams } from "react-router-dom";

const ViewSingleProduct = () => {

    const listItems = [];
    const {id} = useParams();        
	const [product, setProduct] = useState("");
    const [quantity,setQuantity]= useState("");
    
    const addToCart =()=>{
        // pull the other items from session
        const item = JSON.parse(sessionStorage.getItem("cart"));
        listItems.concat(item);
        console.log(listItems);
        const pid = product.productId;
        const qty = quantity;
        // creating an object: retrieve these later by using their const names
        const data = {pid, qty};
        if(listItems && listItems.length >= 1) {
            listItems.concat(data);
            console.log("no items");
        }
        else{
            listItems.push(data)
            console.log("here");
        }  
        //add session items onto the current items
        listItems.concat(item);
        //add all of it back to the session
        sessionStorage.setItem("cart", JSON.stringify(listItems));
    }

    const changeQuantity=(event)=>{
        const value = event.target.value;
        setQuantity(value);
    }


    
    useEffect(() =>{	
        const fetchData  = async () => {
            try {
                const response = await ProductService.getProductById(id);                                           
                setProduct(response.data);
                setQuantity("1");
            } catch(error) {
                console.log(error);
            }
        }; 

        if(id && id !=="")
		fetchData();
	},[id]);

    
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
</>
    )
};
export default ViewSingleProduct;



