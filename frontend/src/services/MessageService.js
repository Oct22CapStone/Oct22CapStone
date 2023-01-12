import axios from "axios";

// const PRODUCT_API_BASE_URL = "http://localhost:8181/product";


class MessageService {

    // getProduct() {
    //     return axios.get(PRODUCT_API_BASE_URL);
    // }
    // getProductById(id){
    //     return axios.get(`http://localhost:8181/product/${id}`);
    // }
    // delete(id){
    //     return axios.delete(`http://localhost:8181/product/delete/${id}`);
    // }
    // update(id,product){
    //     return axios.put(`http://localhost:8181/product/update/${id}`, product);
    // }
    createMessage(message){
        return axios.post(`http://localhost:8181/messages/add/message`, message);
    }


}



export default new MessageService();
