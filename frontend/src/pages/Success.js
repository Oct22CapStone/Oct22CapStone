import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import UserOrdersService from "../services/UserOrdersService";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";
import OrderItemService from "../services/OrderItemService";


function Success() {
    const [address, setAddress] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    var newList = [];
    useEffect(() => {
        const createOrder = async () => {
            try {
                setLoading(true);
                setAddress(JSON.parse(localStorage.getItem('orderAddress')));
                const cart = JSON.parse(localStorage.getItem("cart"));
                const current = new Date();
                const tracking = "Pending";
                const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
                const email = JSON.parse(localStorage.getItem("userEmail"));
                const response = await UserService.getUserByEmail(email);
                const addr = await AddressService.getAddressById((address));
                const price = localStorage.getItem("totalPriceCart");
                const order = { orderDate: date, totalPrice: price, trackingInfo: tracking, userId: response.data, addressId: addr.data };
                console.log("order:");
                console.log(order);
                const newOrder = await UserOrdersService.create(order);
                
                newList = items.map( function (item) {  
                    const details ={productQty: 1, orderId: newOrder.data, productId: item}; 
                    console.log(details);
                     OrderItemService.create(details);
                });

                setLoading(false);
                localStorage.setItem("cart","[]");
                history.push(`/orderdetails/${newOrder.data.orderId}`);
            } catch (error) {
                console.log(error);
            }

        }
        if (JSON.parse(localStorage.getItem('orderAddress')) != null) {
            setItems(JSON.parse(localStorage.getItem('cart')));
            createOrder();
        }
        else {
            history.push("/cart");
        }

    }, [address]);

    return (
        <>
            <div></div>
        </>
    )
};
export default Success;