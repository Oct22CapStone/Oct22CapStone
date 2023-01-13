import axios from "axios";

//const USER_API_BASE_URL = "http://localhost:8181/userpage";


class UserService {

    // getUser() {
    //     return axios.get("http://localhost:8181/userpage/show");
    // }

    getUserById(userId) {
        return axios.get(`http://localhost:8181/userpage/show/${userId}`)
    }

    deleteUser() {
        return axios.delete("http://localhost:8181/userpage/delete/{user_id}");
    }

    // editUser() {
    //     return axios.put("http://localhost:8181/userpage/update/{user_id}");
    // }

    // addUser() {
    //     return axios.post("http://localhost:8181/userpage/save");
    // }
}

export default new UserService();