import axios from "axios";

const PRODUCT_API_BASE_URL = "https://backendecommerce.azurewebsites.net/user_role";


class UserRoleService {

    findAllUserRole() {
        return axios.get(PRODUCT_API_BASE_URL + "/show");
    }
    getUserRoleById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/user_role/show/${id}`);
    }
    delete(id){
        return axios.delete(`https://backendecommerce.azurewebsites.net/user_role/delete/${id}`);
    }
    update(id,userRole){
        return axios.put(`https://backendecommerce.azurewebsites.net/user_role/update/${id}`, userRole);
    }
    createUserRole(userRole){
        return axios.post(`https://backendecommerce.azurewebsites.net/user_role/save`, userRole);
    }


}



export default new UserRoleService();
