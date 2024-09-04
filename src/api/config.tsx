import axios from "axios";

const apiConfig = {
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export const api = axios.create(apiConfig)