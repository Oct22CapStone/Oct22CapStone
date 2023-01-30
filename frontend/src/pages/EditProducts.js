import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, useParams, useHistory } from "react-router-dom";
export default function EditProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const submitEdit = async (event) => {
    event.preventDefault();
    await ProductService.update(product.productId, product);
    history.push("/viewproducts");
  };
  const handleChange = (event) => {
    setProduct(product => ({ ...product, [event.target.name]: event.target.value }));
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (id && id !== "")
      fetchData();
  }, [id]);
  return (
    <>      {!loading && (
        <div key={product.productId} className="container mt-5 mbclassName-5">          <Link to="/viewproducts" className="btn btn-secondary btn-sm">Back</Link>          <form>            <div className="mb-3 form-group">              <label>Product Name:</label>              <input name="productName" onChange={handleChange} className="form-control" defaultValue={product.productName} />            </div>            <div className="mb-3 form-group">              <label>Product Description: (max 255 characters)</label>              <textarea maxLength={255} name="productDescription" onChange={handleChange} className="form-control" defaultValue={product.productDescription}></textarea>            </div>            <div className="mb-3 form-group">              <label>Price:</label>              <input name="pricePerUnit" onChange={handleChange} className="form-control" defaultValue={product.pricePerUnit} />            </div>            <div className="mb-3 form-group">              <label>Quantity Available:</label>              <input name="productQty" onChange={handleChange} className="form-control" defaultValue={product.productQty} />            </div>            <div className="mb-3 form-group">              <label>Image url:</label>              <input name="productImg" onChange={handleChange} className="form-control" defaultValue={product.productImg} />            </div>            <button className="btn btn-primary btn-sm" type="submit" onClick={(e) => submitEdit(e)}>              Update
            </button>          </form>        </div>      )}
    </>  )
}