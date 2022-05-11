import axios from "axios";

const axiosInstanceLocal = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});
export default axiosInstanceLocal;