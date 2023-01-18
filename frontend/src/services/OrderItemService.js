import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/order_item";


class OrderItemService {

    findAll() {
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
    getById(id){
        return axios.get(`http://localhost:8181/order_item/show/${id}`);
    }
    delete(id){
        return axios.delete(`http://localhost:8181/order_item/delete/${id}`);
    }
    update(id,orderItem){
        return axios.put(`http://localhost:8181/order_item/update/${id}`, orderItem);
    }
    create(orderItem){
        return axios.post(`http://localhost:8181/order_item/save_order_item`, orderItem);
    }

}



export default new OrderItemService();