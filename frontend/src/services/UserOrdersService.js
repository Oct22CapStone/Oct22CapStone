import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/user_orders";


class UserOrdersService {
    getAllUserOrders(){
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
    getById(id){
        return axios.get(`http://localhost:8181/user_orders/orders/${id}`);
    }
}

export default new UserOrdersService();
