import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/user_orders";


class UserOrdersService {
    getAllUserOrders(){
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
    getById(id){
        return axios.get(`http://localhost:8181/user_orders/orders/${id}`);
    }

    update(id,order){
        return axios.put(`http://localhost:8181/user_orders/update/${id}`, order);

    }
}

export default new UserOrdersService();