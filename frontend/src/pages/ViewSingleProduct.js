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