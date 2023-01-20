import axios from "axios";

//const EMAIL_API_BASE_URL = "https://backendecommerce.azurewebsites.net/email";

class EmailService {

    createEmail(email){
        return axios.post(`https://backendecommerce.azurewebsites.net/email/send`, email);
    }
}

export default new EmailService();