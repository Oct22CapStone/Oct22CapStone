import axios from "axios";

const PRODUCT_API_BASE_URL = "https://backendecommerce.azurewebsites.net/order_item";


class OrderItemService {

    findAll() {
        return axios.get(PRODUCT_API_BASE_URL + "/all");
    }
    getById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/order_item/show/${id}`);
    }
    delete(id){
        return axios.delete(`https://backendecommerce.azurewebsites.net/order_item/delete/${id}`);
    }
    update(id,orderItem){
        return axios.put(`https://backendecommerce.azurewebsites.net/order_item/update/${id}`, orderItem);
    }
    create(orderItem){
        return axios.post(`https://backendecommerce.azurewebsites.net/order_item/save_order_item`, orderItem);
    }

}



export default new OrderItemService();
