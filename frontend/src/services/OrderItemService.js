import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/order_item";


class OrderItemService {

    getOrderItem() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getAllOrderItems(){
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
}

export default new OrderItemService();
