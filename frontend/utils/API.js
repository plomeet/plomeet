import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: 'http://10.0.2.2:8080',
  baseURL: 'http://127.0.0.1:8080',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
