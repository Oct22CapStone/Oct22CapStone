import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import UserRoleService from "../services/UserRoleService";


const ViewProducts = () => {
	let tempPrd = [];
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const [query, setQuery] = useState('');//FOR SEARCH
	const[filterdata, setFilterData]= useState([]);//FOR SEARCH


	useEffect(() =>{

		const fetchRole = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 1) {
                history.push("/");
            }
		}
    
		const fetchData  = async () => {
			const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            var roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 2) {
			setLoading(true);
			try {
				const response = await ProductService.getProduct();

				for (let i in response.data){
					tempPrd.push(response.data[i]);
				
				}
				setProducts(tempPrd);
        setFilterData(tempPrd);

			} catch(error) {
				console.log(error);
			}
		
			setLoading(false);

		};
		const fetchRole = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const roleRes = await UserRoleService.findAllUserRole();
            let roles = roleRes.data.filter(a => { return a.user.userId === userRes.data.userId }).
                map(function (r) { return r.role.roleId });
            console.log(roles);
            if (roles != 1) {
                history.push("/");
            }

		}
	};
		fetchRole();
		fetchData();
		
		
	}, []);

	async function deleteProduct  (id,e){
		console.log(id);

			setProducts(
			products.filter((product) => {
				if (product.productId === id){
					let flip = product.showProduct;
					flip = (!flip);
					product.showProduct = flip;
					console.log(product);
					ProductService.update(id,product);
				}
				

				return product;
			})
		 );
   };

   //SEARCH BY PRODUCT NAME FUNCTION
   const handlesearch=(event)=>{
    const getSearch=event.target.value;
    if(getSearch.length > 0){
      const searchdata= products.filter( (item)=> item.productName.toLowerCase().includes(getSearch));
      setProducts(searchdata);
    } else {
      setProducts(filterdata);
    }
    setQuery(getSearch);
  }

	return (				
		<>{!loading &&(
		<div>		
			<table className="table">

			<div className = "card">
				<div className = "card-body text-center">
					<h2 className = "display-4 text-center fw-bold">Manage Products</h2>
					<div className = "mb-2">
						<Link to="/addproduct" className="btn btn-primary">Add New Product</Link>
					</div>
					<div className = "mb-2">
              			<input type="text" name='productName' value={query} placeholder="Search by product name.." onChange={(e)=>handlesearch(e)}></input>
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
            <button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Deactivate"><i className="fa fa-eye"></i></button>
}
{!(showProduct) &&
	<button onClick={(e)=>deleteProduct(productId,e)} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Activate"><i className="fa fa-eye-slash"></i></button>
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
	</table>
	</div>)}
	</>
	)
};


export default ViewProducts;
