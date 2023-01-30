import ProductService from "../services/ProductService";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import UserRoleService from "../services/UserRoleService";

const AddProduct = () => {   
    const [product, setProduct] = useState("");
    const history = useHistory();

    useEffect(() => {
      const fetchRole = async () => {
        const email = JSON.parse(localStorage.getItem("userEmail"));
        const userRes = await UserService.getUserByEmail(email);
        const roleRes = await UserRoleService.findAllUserRole();
        var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
            map(function (r) { return r.role.roleId });
        if (roles != 1) {
            history.push("/");
        }
      }
      fetchRole();
    })


    const handleSubmit = async (event) =>{
      event.preventDefault();
        await ProductService.createProduct(product);
        history.push("/viewproducts");
      };
    const handleChange = (event) =>{
      setProduct(product =>({...product, [event.target.name]: event.target.value}));
    }
    return (
        <>      <Link to="/viewproducts" className="btn btn-secondary btn-sm">Back</Link>      <div key={product.productId} className="container mt-5 mbclassName-5">         <form>      <div className="mb-3 form-group">        <label>Product Name:</label>        <input name="productName" onChange={handleChange} className="form-control" />      </div>      <div className="mb-3 form-group">        <label>Product Description: (max 255 characters)</label>        <textarea maxLength={255} name="productDescription" onChange={handleChange} className="form-control"></textarea>      </div>      <div className="mb-3 form-group">        <label>Price:</label>        <input name="pricePerUnit" onChange={handleChange} className="form-control"/>      </div>      <div className="mb-3 form-group">        <label>Quantity Available:</label>        <input name="productQty" onChange={handleChange} className="form-control"/>      </div>      <div className="mb-3 form-group">        <label>Image url:</label>        <input name="productImg" onChange={handleChange} className="form-control"/>      </div>      <button className="btn btn-primary btn-sm" type="submit" onClick={(e)=> handleSubmit(e)}>        Post
      </button>    </form>    </div></>    )
};
export default AddProduct;