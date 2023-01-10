import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/addresspage";


class AddressService {

    findAllAddresses() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getAddressById(id){
        return axios.get(`http://localhost:8181/addresspage/showaddress/${id}`);
    }
    delete(id){
        return axios.delete(`http://localhost:8181/addresspage/delete/${id}`);
    }
    update(id,address){
        return axios.put(`http://localhost:8181/addresspage/updateAddress/${id}`, address);
    }
    createAddress(address){
        return axios.post(`http://localhost:8181/addresspage/save_address`, address);
    }


}



export default new AddressService();
