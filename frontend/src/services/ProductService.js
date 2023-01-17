import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/product";


class ProductService {

    getProduct() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getProductById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/product/${id}`);
    }
    delete(id){
        return axios.delete(`https://backendecommerce.azurewebsites.net/product/delete/${id}`);
    }
    update(id,product){
        return axios.put(`https://backendecommerce.azurewebsites.net/product/update/${id}`, product);
    }
    createProduct(product){
        return axios.post(`https://backendecommerce.azurewebsites.net/product/save_product`, product);
    }


}



export default new ProductService();
