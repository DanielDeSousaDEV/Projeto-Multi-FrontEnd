import axios from "axios";

const apiConfig = {
    baseURL: "http://127.0.0.1:8000/api"
}

export const api = axios.create(apiConfig)