import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/product";


class ProductService {

    getProduct() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getProductById(id){
        return axios.get(`http://localhost:8181/product/${id}`);
    }
    delete(id){
        return axios.delete(`http://localhost:8181/product/delete/${id}`);
    }
    update(id,product){
        return axios.put(`http://localhost:8181/product/update/${id}`, product);
    }
    createProduct(product){
        return axios.post(`http://localhost:8181/product/save_product`, product);
    }


}



export default new ProductService();
