import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, Route, useHistory } from "react-router-dom";



const ViewProducts = () => {
	const { authState } = useOktaAuth();
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
				setProducts(response.data);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
		
	}, []);

	async function deleteProduct  (id,e){
		console.log(id);
		await ProductService.delete(id);
		setProducts(
			products.filter((product) => {
			   return product.productId !== id;
			})
		 );
   };

	return (				
		<>{!loading &&(
		<div>
			<Link to="/addproduct" className="btn btn-primary btn-sm">Add New Product</Link>
			<table className="table">
				<thead className="font-weight-bold">
				<tr>
			<th scope="col"></th>
      		<th scope="col">Product</th>
      		<th scope="col">Price</th>
      		<th scope="col">Quantity </th>
      		<th scope="col">Manage</th>
    		</tr>
				</thead>
				<tbody>
			{products.map(
({productId, productName, pricePerUnit, productQty, productImg, productDescription}) =>(

				
    <tr key={productId}>
		<td><img className="rounded-pill" width={50} height={50} src={productImg} /></td>
    	<td><Link to={`/viewsingleproduct/${productId}`}>{productName}</Link></td>
		<td>${pricePerUnit}</td>
		<td>{productQty}    {productQty < 80 ? '  Low On Stock Please Reorder' : ''}</td>
		<td>
    <ul className="list-inline m-0">
        <li className="list-inline-item">
            <Link to={`/editproducts/${productId}`} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></Link>
        </li>
        <li className="list-inline-item">
            <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
        </li>
        </ul>
        </td>
	</tr>
	))};
	</tbody>
	</table>
	</div>)}
	</>
	)
};


export default ViewProducts;