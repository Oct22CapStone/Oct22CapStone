import axios from "axios";

//const EMAIL_API_BASE_URL = "http://localhost:8181/email";

class EmailService {

    createEmail(email){
        return axios.post(`http://localhost:8181/email/send`, email);
    }
}

export default new EmailService();