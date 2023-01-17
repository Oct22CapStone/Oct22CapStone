import axios from "axios";

//const USER_API_BASE_URL = "http://localhost:8181/userpage";


class UserService {

    // getUser() {
    //     return axios.get("http://localhost:8181/userpage/show");
    // }

    deleteUser() {
        return axios.delete("https://backendecommerce.azurewebsites.net/userpage/delete/{user_id}");
    }


    update(id,user){
        return axios.put(`https://backendecommerce.azurewebsites.net/userpage/update/${id}`, user);
    }

    createUser(user){
        return axios.post(`https://backendecommerce.azurewebsites.net/userpage/save`, user);
    }

    checkUser(email){
        return axios.get(`https://backendecommerce.azurewebsites.net/userpage/check/${email}`).then(response=>response.data);
    }

    getUserById(id){
        return axios.get(`https://backendecommerce.azurewebsites.net/userpage/show/${id}`);
    }

    getUserByEmail(email){
        return axios.get(`https://backendecommerce.azurewebsites.net/userpage/userbyemail/${email}`);
    }

}

export default new UserService();
