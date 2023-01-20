import axios from "axios";

const PRODUCT_API_BASE_URL = "https://backendecommerce.azurewebsites.net/user_orders";


class UserOrdersService {
    getAllUserOrders(){
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
    getById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/user_orders/orders/${id}`);
    }
    update(id,order){
        return axios.put(`https://backendecommerce.azurewebsites.net/user_orders/update/${id}`, order);
    }
}

export default new UserOrdersService();
