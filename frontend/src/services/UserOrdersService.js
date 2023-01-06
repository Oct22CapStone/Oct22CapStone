import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/user_orders";


class UserOrdersService {

    getUserOrders() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getAllUserOrders(){
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
}

export default new UserOrdersService();
