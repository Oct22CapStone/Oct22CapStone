import Header from '../components/Navbar/Header';
import Footer from '../components/Navbar/Footer';
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { Link, useHistory } from "react-router-dom";
import UserRoleService from "../services/UserRoleService";


const PopularItems = () => { 
    let tempPrd = [];
    let prdDisplay = [];
    const [products, setProducts] = useState([]);
    let randNumber = [];
    const [loading, setLoading] = useState(true);
    const [num, setNum] = useState(0);
    const [product, setProduct] = useState("");
    const [canAdd, setCanAdd] = useState(0);
	const history = useHistory();

    useEffect(() => {
		const fetchRole = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            let roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 2) {
                history.push("/");
            }
      }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await ProductService.getProduct();
                for (let i in response.data){
                    if ((response.data[i].showProduct == true)){
                        prdDisplay.push(response.data[i]);
                    }
                }
                const randomNumber = e => {
                    const len = prdDisplay.length;
                    for (let i=1;i<=10; i++){
                        randNumber.push(Math.floor(Math.random() * len));}
                }
                randomNumber();
 
                for (let j in randNumber){
                    tempPrd.push(prdDisplay[randNumber[j]]);
          
                } 
                setProducts(tempPrd);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
		fetchRole();
        fetchData();
    }, []); 
    function containsObject(list, obj) {
        if (list != null){
            let i = 0;
            while(i < (list.length)){
                if( JSON.stringify(list[i]) == JSON.stringify(obj) ){
                    return true;
                }
                i++;
            }
        }
        return false; 
    }
    
    function localObj(){
        const data = {productId: product.productId, productName: product.productName, productDescription: product.productDescription,
            productImg: product.productImg, pricePerUnit: product.pricePerUnit, showProduct: product.showProduct, priceCode:product.priceCode};
        return data;
    }


    const addToCart = () => {
        if(localStorage.getItem("cart") == null){
            localStorage.setItem("cart","[]");
        }
        const items = JSON.parse(localStorage.getItem("cart"));
        const data = localObj();
		
        if(!containsObject(items, data)){
            items.push(data);
            localStorage.setItem("cart", JSON.stringify(items));
            window.parent.updateCartTotal();
            setCanAdd(1);
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
        fetch(`https://backendecommerce.azurewebsites.net/product/${num}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
            
    }, [num]);
    useEffect(() =>{
        if (num && num != 0){
            addToCart();
        }
    }, [product])
    return (
        <>
            <Header />
            <section className="py-5">
                <div className="container mt-3">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        {!loading && (
                            <div className="row">
                                {products.map(
                                    (productItems, index) => (
                                        <div key={index} className="col-lg-4 col-4 d-flex">
                                            <div style={{ width: "30rem" }} className="card">
                                                <Link to={`/viewsingleproduct/${productItems.productId}`}>
                                                    <img className="card-img-top image-fluid" src={productItems.productImg} alt={productItems.productDescription} />
                                                </Link>
                                                <div className="card-body p-4">
                                                    <div className="text-center">
                                                        <h5 className="fw-bolder">
                                                            <Link to={`/viewsingleproduct/${productItems.productId}`}>{productItems.productName}</Link>
                                                        </h5>
                                                        <h4 className="mb-1" >${productItems.pricePerUnit}</h4>
                                                        <h6 className="text-success">Free shipping</h6>
                                                        {/* <button onClick={(e) => addToCart(productItems.productId, e)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button> */}
                                                        <button onClick={(e) => setId(productItems.productId)} className="btn btn-outline-dark mt-auto" type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
                                                        {(num == productItems.productId) && (canAdd == 1) && <div className="alert alert-success" role="alert">Added Successfully</div>}
                                                        {(num == productItems.productId) && (canAdd == 2) && <div className="alert alert-danger" role="alert">Item Already in Cart</div>}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>)}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
};

export default PopularItems;