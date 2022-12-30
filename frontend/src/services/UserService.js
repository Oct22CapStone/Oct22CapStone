import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8181/userpage/show";


class UserService {

    getUser() {
        return axios.get(USER_API_BASE_URL);
    }
}

export default new UserService();
