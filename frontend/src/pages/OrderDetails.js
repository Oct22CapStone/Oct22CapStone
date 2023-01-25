import { useEffect, useState } from "react";
import OrderItemService from "../services/OrderItemService";
import { useParams } from "react-router-dom";
import UserOrdersService from "../services/UserOrdersService";
import UserRoleService from "../services/UserRoleService";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";

const OrderDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
	const history = useHistory();

    useEffect(() => {
        const fetchOrder = async () => {
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const userRes = await UserService.getUserByEmail(email);
            const response = await UserOrdersService.getById(id);
            if (userRes.data.userId !== response.data.userId.userId) {
                history.push("/userorders");
            }
		}
        fetchOrder();
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await UserOrdersService.getById(id);
                setOrder(response.data);
                const result = await OrderItemService.findAll();
                setOrderDetails(result.data.filter(o => { return o.orderId.orderId == response.data.orderId }));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
            
        };

        if (id && id !== "")
            fetchData();

    }, [id]);


    return (
        <>
        {!loading && (
            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: "10px" }}>
                                <div className="card-header px-4 py-5">
                                    <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>{order.userId.firstName}</span>!</h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt</p>
                                        <p className="small text-muted mb-0">Order Id : {order.orderId}</p>
                                    </div>
                                    {orderDetails.map(
                                        ({ productId }) => (
                                            <div className="card shadow-0 border mb-4">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                                                            <img src={productId.productImg}
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="col-lg-4 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0">{productId.productName}</p>
                                                        </div>
                                                        <div className="col-lg-4 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 small">{productId.productDescription}</p>
                                                        </div>                                        
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 small">${productId.pricePerUnit}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-2">
                                                            <p className="text-muted mb-0 small">Track Order</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                                                <div className="progress-bar" role="progressbar"
                                                                    style={{ width: "65%", borderRadius: "16px", backgroundColor: "#a8729a" }} aria-valuenow="65"
                                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <div className="d-flex justify-content-around mb-1">
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-0">Order Details</p>
                                        <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> ${order.totalPrice}</p>
                                    </div>

    

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Invoice Date : {order.orderDate}</p>
                                        
                                        
                                        
                                        <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-5">
                                    </div>
                                </div>
                                <div className="card-footer border-0 px-4 py-5"
                                    style={{ backgroundColor: "#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                                        paid: <span className="h2 mb-0 ms-2">${order.totalPrice}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)}
        </>

    )
};
export default OrderDetails;



