import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8181/user_role";


class UserRoleService {

    findAllUserRole() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
    getUserRoleById(id){
        return axios.get(`http://localhost:8181/user_role/show/${id}`);
    }
    delete(id){
        return axios.delete(`http://localhost:8181/user_role/delete/${id}`);
    }
    update(id,userRole){
        return axios.put(`http://localhost:8181/user_role/update/${id}`, userRole);
    }
    createUserRole(userRole){
        return axios.post(`http://localhost:8181/user_role/save`, userRole);
    }


}



export default new UserRoleService();
