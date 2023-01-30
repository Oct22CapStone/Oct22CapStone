import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { useParams } from "react-router-dom";
import UserRoleService from "../services/UserRoleService";
import UserService from "../services/UserService";


const ViewSingleProduct = () => {

    const [num,setNum] = useState();
    const [canAdd,setCanAdd] = useState(0);
    const { id } = useParams();
    const [product, setProduct] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    
    let isDupe = 1;

    const addToCart = () => {

        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
        }
        const items = JSON.parse(localStorage.getItem("cart"));

        const data = {productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct, priceCode: product.priceCode};

        for(let i in items){
            if (items[i].productId === data.productId) {
                window.confirm(data.productName + " is already in your cart.");
                isDupe = 0;
            }
        }

        if(isDupe !== 0){
            items.push(data);
            localStorage.setItem("cart", JSON.stringify(items));
            window.confirm(data.productName +" has been added to your cart.");
            window.location.reload(true);

        }
        else{
            setCanAdd(2);
        }  
    } 
	
    function setId(productId){
        setNum(productId);
        setCanAdd(0);
    };
    
useEffect(() => {
         const fetchData = async () => {
            try {

                //assign role if not logged in
				if (localStorage.getItem("userEmail") == null ) {
					setIsAdmin(false);
				}
				else {//if logged in...
                const email = JSON.parse(localStorage.getItem("userEmail"));
                const emailRes = await UserService.getUserByEmail(email);
                setUsers(emailRes.data);
                const roleRes = await UserRoleService.findAllUserRole();
                roles = roleRes.data.filter(a => { return a.user.userId === emailRes.data.userId }).
                    map(function (r) { return r.role.roleId });
					console.log(roles + " roles");

                	if (roles == 1) {
                    	setIsAdmin(true);
                	} else {
                    	setIsAdmin(false);
                	}
				}//end

                setCanAdd(0);   
                const response = await ProductService.getProductById(id);
                setProduct(response.data);   
            } catch (error) {
                console.log(error);
            }
        };
        if (id && id !== "")
            fetchData();
    }, []);

    
    return (
        <>
        <section className="py-5">
            <div key={product.productId} className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.productImg} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">PID: {product.productId}</div>
                        <h1 className="display-5 fw-bolder">{product.productName}</h1>
                        <div className="fs-5 mb-5">
                            <span>${product.pricePerUnit} </span>
                    </div>
                    <div>
                        <p className="lead">{product.productDescription}</p>
                    </div>                          
                    <div className="d-flex">


                    {
                        !isAdmin ? (
                            <div>
                                {(buttonClicked) && <button onClick={(e) => setId(product.productId)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>}
                                {(num == product.productId) && (canAdd == 1) && <div className="alert alert-success" role="alert">Added Successfully</div>}
                                {(num == product.productId) && (canAdd == 2) && <div className="alert alert-danger" role="alert">Item Already in Cart</div>}
                            </div>
                            ) : (
                                <div >
                                </div>
                                )
                    }                           

                        <br></br>                      
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )

};

export default ViewSingleProduct;