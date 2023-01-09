import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8181/userpage/show";


class UserService {

    getUser() {
        return axios.get(USER_API_BASE_URL);
    }
    createUser(user){
        return axios.post(`http://localhost:8181/userpage/save`, user);
    }
    checkUser(email){
        return axios.get(`http://localhost:8181/userpage/check/${email}`).then(response=>response.data)
    }
}

export default new UserService();
