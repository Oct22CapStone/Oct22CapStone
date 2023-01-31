import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import UserOrdersService from "../services/UserOrdersService";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";
import OrderItemService from "../services/OrderItemService";
import axios from "axios";


function Success() {
    const [address, setAddress] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    let newList = [];
    useEffect(() => {
        const createOrder = async () => {
            try {
                setLoading(true);
                setAddress(JSON.parse(localStorage.getItem('orderAddress')));
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
                const mailTemplate = {
                    recipient: response.data.email,
                    msgBody: `
                        Hello, ${response.data.firstName}, thank you for your purchase. 
                        Your order will be delivered to ${addr.data.street} ${addr.data.city} ${addr.data.state} ${addr.data.zip} ${addr.data.country}
                        Order Id: ${newOrder.data.orderId}
                        Tracking info: ${tracking}.
                        Invoice date: ${date}.
                        Order Total: $${price}.
                      `,
                    subject: "Thank you for your purchase!"
                  }
                  const sendEmail = async (event) => {
                    axios({
                      method: "POST",
                      url: "https://backendecommerce.azurewebsites.net/email/send",
                      data: mailTemplate
                    })}
                    sendEmail();
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