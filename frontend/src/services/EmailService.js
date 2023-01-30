import axios from "axios";

class EmailService {

    createEmail(email){
        return axios.post(`https://backendecommerce.azurewebsites.net/email/send`, email);
    }
}

export default new EmailService();