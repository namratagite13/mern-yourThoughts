import axios from "axios";


//we need to set base url dynamic because in production it is not localhost

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;