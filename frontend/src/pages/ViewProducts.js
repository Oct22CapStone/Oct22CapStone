import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, Route, useHistory } from "react-router-dom";



const ViewProducts = () => {
	var tempPrd = [];
	const { authState } = useOktaAuth();
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();
				for (var i in response.data){

					tempPrd.push(response.data[i]);
				
				}
				setProducts(tempPrd);
			} catch(error) {
				console.log(error);
			}
		
			setLoading(false);
		};
		fetchData();
		
	}, []);

	async function deleteProduct  (id,e){
		console.log(id);

			setProducts(
			products.filter((product) => {
				if (product.productId === id){
					var flip = product.showProduct;
					flip = (!flip);
					product.showProduct = flip;
					console.log(product);
					ProductService.update(id,product);
				}
				

				return product;
			})
		 );
   };

	return (				
		<>{!loading &&(
		<div>
			<div className = "card">
				<div className = "card-body text-center">
					<h2 className = "display-4 text-center fw-bold">Manage Products</h2>
					<div>
				<Link to="/addproduct" className="btn btn-primary mb-4">Add New Product</Link>
				</div>
				<div className ="row">
					<div className = "col-lg-12 mb-4 mb-sm-5">
				
				<table className="table table-bordered">
				<thead className="font-weight-bold">
				<tr>


      		<th scope="col">Product Images</th>
          <th scope="col">Product Name</th>
      		<th scope="col">Price Per Unit</th>
      		<th scope="col">Total Quantity</th>
			    <th scope="col">Visible</th>
      		<th scope="col">Manage</th>

    		</tr>
				</thead>
				<tbody>
				
			
			{products.map(
({productId, productName, pricePerUnit, productQty, productImg, productDescription, showProduct}) =>(

				
    <tr key={productId}>
		<td><img className="rounded-pill" width={50} height={50} src={productImg} /></td>
    	<td><Link to={`/viewsingleproduct/${productId}`}>{productName}</Link></td>
		<td>${pricePerUnit}</td>
		<td>{productQty}{productQty < 3 ? 
		<p class="text-danger">Low on Stock Please Reorder</p>: ''}</td>

		<td>
			{showProduct.toString()}
		</td>

		<td>
    <ul className="list-inline m-0">
        <li className="list-inline-item">
            <Link to={`/editproducts/${productId}`} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></Link>
        </li>
        <li className="list-inline-item">
			{(showProduct) && 
            <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
}
{!(showProduct) &&
	<button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
}
        </li>
        </ul>
        </td>
	</tr>
	))}
	</tbody>
	</table>
	</div>
	</div>
	</div>
	</div>
	</div>)}
	</>
	)
};


export default ViewProducts;