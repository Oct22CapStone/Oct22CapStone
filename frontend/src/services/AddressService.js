import axios from "axios";

const PRODUCT_API_BASE_URL = "https://backendecommerce.azurewebsites.net/addresspage";


class AddressService {

    findAllAddresses() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getAddressById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/addresspage/showaddress/${id}`);
    }
    delete(id){
        return axios.delete(`https://backendecommerce.azurewebsites.net/addresspage/delete/${id}`);
    }
    update(id,address){
        return axios.put(`https://backendecommerce.azurewebsites.net/addresspage/updateAddress/${id}`, address);
    }
    createAddress(address){
        return axios.post(`https://backendecommerce.azurewebsites.net/addresspage/save_address`, address);
    }

}



export default new AddressService();
