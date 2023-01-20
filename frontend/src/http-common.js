import axios from "axios";

export default axios.create({
    baseURL: "https://backendecommerce.azurewebsites.net",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
