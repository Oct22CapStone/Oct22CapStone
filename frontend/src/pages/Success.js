import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import UserOrdersService from "../services/UserOrdersService";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";


function Success() {
    const [user, setUser] = useState([]); 
    const [address, setAddress] = useState([]); 
    const history = useHistory();
    const [loading,setLoading] = useState(true);
    

useEffect(() => {
    const createOrder = async() => {
        try{
            setLoading(true);
            const cart = JSON.parse(localStorage.getItem("cart"));
            const current = new Date();
            const tracking = "Pending";
            const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
            const email = JSON.parse(localStorage.getItem("userEmail"));
            const response = await UserService.getUserByEmail(email);
            setUser(response.data);
            console.log("user:");
            console.log(response.data);
            const price = localStorage.getItem("totalPriceCart");
            const order = {orderDate: date,totalPrice: price,trackingInfo: tracking,userId: user,addressId: address};
            console.log("order:");
            console.log(order);
            await UserOrdersService.create(order);
            setLoading(false);
        }catch(error){
            console.log(error);
        }

}       
    if (JSON.parse(localStorage.getItem('orderAddress')) != null) {
        setAddress(JSON.parse(localStorage.getItem('orderAddress')));    
        createOrder();
    }
    else{
        history.push("/cart");
    }
    
}, []);

return (
    <>
        <div></div>
    </>
)
};
export default Success;