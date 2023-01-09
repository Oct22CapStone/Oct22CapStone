import axios from "axios";

//const USER_API_BASE_URL = "http://localhost:8181/userpage";


class UserService {

    getUser() {
        return axios.get("http://localhost:8181/userpage/show");
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
    createUser(user){
        return axios.post(`http://localhost:8181/userpage/save`, user);
    }

    checkUser(email){
        return axios.get(`http://localhost:8181/userpage/check/${email}`).then(response=>response.data)

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
