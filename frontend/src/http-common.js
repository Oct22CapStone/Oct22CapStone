import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8181",
    headers: {
        "Content-type": "applocation/json",
        "Access-Control-Allow-Origin": "*",
    },
});