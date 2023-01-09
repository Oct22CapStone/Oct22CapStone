import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8181/userpage/show";


class UserService {

    getUser() {
        return axios.get(USER_API_BASE_URL);
    }
    createUser(user){
        return axios.post(`http://localhost:8181/userpage/save`, user);
    }
    deleteUser() {
        return axios.delete("http://localhost:8181/userpage/delete/{user_id}");
    }
    editUser() {
        return axios.put("http://localhost:8181/userpage/update/{user_id}");
    }
    addUser() {
        return axios.post("http://localhost:8181/userpage/save");
    }
    getUserById(id){
        return axios.get(`http://localhost:8181/userpage/show/${id}`);
    }
}

export default new UserService();